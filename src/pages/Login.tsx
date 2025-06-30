import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';

const Login: React.FC = () => {
  const { user } = useAuth();

  // Redirect to dashboard if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-transparent p-8 rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-400 mb-6 text-center">[Log In]</h1>
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
