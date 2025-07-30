import Layout from '@/components/layout/Layout'
import AddContent from '@/components/lessons/contents/AddContent';
import { useSessionCheck } from '@/hooks/useSessionCheck';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
const AddContentPage = () => {
    useSessionCheck();
    const { lessonId, courseId } = useParams();
    return (
        <Layout>
            <div className="container mx-auto px-2 py-6">
                <Link to={`/courses/${courseId}/lesson/${lessonId}`} className='flex items-center gap-2 hover:ms-3 hover:text-primary'>
                    <ArrowLeft size={16} /> <span>Back to lesson</span>
                </Link>
                <div className="w-full mx-auto bg-transparent p-4 rounded-lg">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-300 text-center">Add Lesson Contents</h1>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-400 text-center">It helps you to browse courses, enroll, teach or to discover FluentQuest services.</p>
                    <AddContent />
                
                </div>
            </div>
            
        </Layout>
    )
}

export default AddContentPage
