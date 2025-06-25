import UserRegistrationForm from '@/components/auth/UserRegistrationForm'
import Layout from '@/components/layout/Layout'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect } from 'react';
import { redirect } from 'react-router-dom';
import { toast } from 'sonner';
const CompleteRegistration = () => {
    const { user } = useAuth();
   
    useEffect(() => {
        if (user?.registered) {
            toast.success("Already Registred!")
            redirect("/login")
           
        } else {
            toast.info("Please complete your profile genuinely!")
        }

    }, [user])


    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w- mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800  text-center">Complete Your Profile</h1>
                    <p className="text-sm font-semibold text-gray-800  text-center">It helps you to browse courses, enroll, teach or to discover FluentQuest services.</p>
                    <UserRegistrationForm user={user} />
                </div>
            </div>
        </Layout>
    )
}
export default CompleteRegistration
