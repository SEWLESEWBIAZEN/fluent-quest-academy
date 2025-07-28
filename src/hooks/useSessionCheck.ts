// hooks/useSessionCheck.ts
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useSessionCheck = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth()
    
    useEffect(() => {
        if (!user) {
            navigate("/login", {
                state: { from: location.pathname }, // optional: to redirect back after login
                replace: true,
            });
        }
    }, []);
};

// // Utility function – replace with your own expiration logic
// function isExpired(token: string): boolean {
//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     const now = Math.floor(Date.now() / 1000);
//     return payload.exp < now;
//   } catch {
//     return true; // treat malformed token as expired
//   }
// }
