
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import RegisterForm from '@/components/auth/RegisterForm';


const Register: React.FC = () => {
  const { user } = useAuth();
  
  // Redirect to dashboard if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Your FluentQuest Account</h1>
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
