import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { apiUrl } from "@/lib/envService";
import Layout from "@/components/layout/Layout";
import UserProfile from "@/components/auth/UserProfile";
import OrbitProgress from "react-loading-indicators/OrbitProgress";
import CircularProgress from "@/components/layout/CircularProgress";
 // make sure apiUrl is defined

const UserProfilePage = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  if (!user) return <Navigate to="/login" replace />;

  useEffect(() => {
    const fetchUser = async () => {     
      try {
        const res = await axios.get(`${apiUrl}/users/user-by-id/${user?.userId}`, {
          headers: {
            "authToken": user?.accessToken ?? ""
          }
        });
        setUserData(res.data?.data);
       
      } catch (err) {
        console.error("Failed to fetch user data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user?.id,user]);

  if (loading) return  <div className="flex justify-center items-center"><CircularProgress/></div>;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="lg:max-w-2xl md:max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-2xl text-gradient-custom capitalize font-semibold mb-6 text-center">
            {userData?.name}'s Profile
          </h1>
          {user && <UserProfile user={userData} />}
        </div>
      </div>
    </Layout>
  );
};

export default UserProfilePage;
