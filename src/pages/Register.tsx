import React from 'react';
import Layout from '@/components/layout/Layout';
import RegisterForm from '@/components/auth/RegisterForm';
const Register: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-transparent p-8 rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Your FluentQuest Account</h1>
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
