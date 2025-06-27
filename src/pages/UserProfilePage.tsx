import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { apiUrl } from "@/lib/envService";
import Layout from "@/components/layout/Layout";
import UserProfile from "@/components/auth/UserProfile";
import CircularProgress from "@/components/layout/CircularProgress";

const UserProfilePage = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // loading state for user data
  const [error, setError] = useState(false);     // error flag

  // Fetch user details when user is ready
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${apiUrl}/users/user-by-id/${user?.userId}`, {
          headers: {
            authToken: user?.accessToken ?? "",
          },
        });       
        setUserData(res.data?.data ?? null);
      } catch (err) {        
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if(user?.userId && user?.accessToken) {
      fetchUser();
      
    }
  }, [user]);

  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  // Redirect to login if no user after auth is done
  if (!authLoading && !user) {
    return <Navigate to="/login" replace />;
  }
  // Render profile
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="lg:max-w-2xl md:max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          {
            (error || !userData) ?
              <div className="w-full justify-center flex items-center text-2xl font-bold ">OOPS...., User Not found!</div> :
              <>
                <h1 className="text-2xl text-gradient-custom capitalize font-semibold mb-6 text-center">
                  {userData?.name ?? "Guest User"}'s Profile
                </h1>
                <UserProfile user={userData} />
              </>
          }
        </div>
      </div>
    </Layout>
  );
};

export default UserProfilePage;
