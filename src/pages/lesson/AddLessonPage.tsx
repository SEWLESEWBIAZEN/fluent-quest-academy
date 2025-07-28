import Layout from '@/components/layout/Layout'
import AddLesson from '@/components/lessons/AddLesson'
import { useSessionCheck } from '@/hooks/useSessionCheck';
const AddLessonPage = () => {
    useSessionCheck();
  return (
     <Layout>
            <div className="container mx-auto px-2 py-6">
                <div className="w-full mx-auto bg-transparent p-4 rounded-lg">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-300 text-center">Add Lesson Contents</h1>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-400 text-center">It helps you to browse courses, enroll, teach or to discover FluentQuest services.</p>
                    <AddLesson />
                </div>
            </div>
        </Layout>
  )
}

export default AddLessonPage
