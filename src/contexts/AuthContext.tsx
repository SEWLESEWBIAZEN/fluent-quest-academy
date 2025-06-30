import React, { createContext, useContext, useEffect, useReducer } from "react";
import { User, AuthState, UserRole, UserData } from "../lib/types"
import {
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { apiUrl } from "@/lib/envService";
import axios from "axios";
import { auth } from "@/config/firebase/config";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  sessionExpiry: null,
};

type AuthAction =
  | { type: "LOADING" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; expiryDate: Date } }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "SESSION_EXPIRED" }
  | { type: "REFRESH_SESSION"; payload: Date }
  | { type: "CLEAR_ERROR" };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        sessionExpiry: action.payload.expiryDate,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
        sessionExpiry: null,
      };
    case "LOGOUT":
      return { ...initialState, isLoading: false };
    case "SESSION_EXPIRED":
      return {
        ...initialState,
        isLoading: false,
        error: "Your session has expired. Please log in again.",
      };
    case "REFRESH_SESSION":
      return { ...state, sessionExpiry: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
  refreshSession: () => void;
  clearError: () => void;
  getSessionTimeRemaining: () => number;
  verifyTwoFactor: (code: string) => Promise<boolean>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function getRoleByEmail(email, token) {
  let userInfo = {}
  const response = await axios.get(`${apiUrl}/users/user-by-email/${email}`, {
    headers: {
      "authToken": token
    }
  })

  userInfo = response?.data?.data || {}
  return userInfo
}
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { toast } = useToast();

  const toUser = async (firebaseUser: FirebaseUser): Promise<User> => {
    let userData:UserData = null
    let token = null
    try {
      token = await firebaseUser.getIdToken();
      userData = await getRoleByEmail(firebaseUser?.email || "", token) as UserData      
    }
    catch (error) {

    }
    finally {
      const role = Object.values(UserRole).includes(userData?.role as UserRole)
        ? (userData?.role as UserRole)
        : UserRole.Guest; // fallback/default if needed

      return {
        id: firebaseUser.uid,
        userId:userData?._id || "",
        email: firebaseUser.email!,
        name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
        role: role, // you may want to load this from Firestore or claims
        twoFactorEnabled: false, // adjust based on your logic
        accessToken: token,
        registered:role === UserRole.Guest?false:true,
        points:userData?.points || 0,
        days:userData?.streakDays || 0,
        verified:userData?.verified || false
      };
    }
  };

  const monitorSession = (expiryDate: Date) => {
    const now = new Date();
    const timeUntilExpiry = expiryDate.getTime() - now.getTime();
    const warningTime = 2 * 60 * 1000;

    if (timeUntilExpiry <= 0) {
      dispatch({ type: "SESSION_EXPIRED" });
      logout();
      return;
    }

    if (timeUntilExpiry > warningTime) {
      setTimeout(() => {
        toast({
          title: "Session Expiring Soon",
          description: "Your session will expire in 2 minutes. Click to extend.",
          action: (
            <button
              onClick={refreshSession}
              className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
            >
              Extend Session
            </button>
          ),
        });
      }, timeUntilExpiry - warningTime);
    }

    setTimeout(() => {
      dispatch({ type: "SESSION_EXPIRED" });
      logout();
      toast({
        title: "🙇🏿 Session Expired",
        description: "Please log in again.",
        variant: "destructive",
      });
    }, timeUntilExpiry);
  };

  const login = async (email: string, password: string, rememberMe: boolean) => {
    try {
      dispatch({ type: "LOADING" });

      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);

      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const expiryDate = new Date(Date.now() + 30 * 60 * 1000); // 30 min session for example
      localStorage.setItem("session_expiry", expiryDate.toISOString());
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: await toUser(user), expiryDate },
      });
      monitorSession(expiryDate);

    } catch (error: any) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message || "Login failed" });
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("session_expiry");
    dispatch({ type: "LOGOUT" });
  };

  const refreshSession = () => {
    const expiryDate = new Date(Date.now() + 30 * 60 * 1000); // Extend another 30 minutes
    localStorage.setItem("session_expiry", expiryDate.toISOString());
    dispatch({ type: "REFRESH_SESSION", payload: expiryDate });
    monitorSession(expiryDate);
    toast({
      title: "Session Extended",
      description: "Your session has been extended.",
      variant:"primary"
    });
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const getSessionTimeRemaining = (): number => {
    const expiryStr = localStorage.getItem("session_expiry") || sessionStorage.getItem("session_expiry");
    if (!expiryStr) return 0;
    const expiry = new Date(expiryStr).getTime();
    return Math.max(0, expiry - Date.now());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const expiryStr = localStorage.getItem("session_expiry") || sessionStorage.getItem("session_expiry");
        const expiryDate = expiryStr ? new Date(expiryStr) : new Date(Date.now() + 30 * 60 * 1000);
        dispatch({ type: "LOGIN_SUCCESS", payload: { user: await toUser(firebaseUser), expiryDate } });
        monitorSession(expiryDate);
      } else {
        dispatch({ type: "LOGOUT" });
      }
    });

    return () => unsubscribe();
  }, []);

  const verifyTwoFactor = async (code: string): Promise<boolean> => {
    // Your logic to verify the code with Firebase or custom backend
    try {
      const response = await fetch('/api/verify-2fa', {
        method: 'POST',
        body: JSON.stringify({ code }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) return false;

      const data = await response.json();
      return data.success;
    } catch (error) {
      
      return false;
    }
  };


  const value: AuthContextType = {
    ...state,
    login,
    logout,
    refreshSession,
    clearError,
    getSessionTimeRemaining,
    verifyTwoFactor,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};