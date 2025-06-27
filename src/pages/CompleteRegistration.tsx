import UserRegistrationForm from '@/components/auth/UserRegistrationForm'
import Layout from '@/components/layout/Layout'
import { useAuth } from '@/contexts/AuthContext'


const CompleteRegistration = () => {
    const { user } = useAuth(); 
    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w- mx-auto bg-transparent p-8 rounded-lg">
                    <h1 className="text-2xl font-bold text-gray-800  text-center">Complete Your Profile</h1>
                    <p className="text-sm font-semibold text-gray-800  text-center">It helps you to browse courses, enroll, teach or to discover FluentQuest services.</p>
                    <UserRegistrationForm user={user} />
                </div>
            </div>
        </Layout>
    )
}
export default CompleteRegistration
