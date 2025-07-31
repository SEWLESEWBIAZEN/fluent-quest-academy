import CircularProgress from '@/components/layout/CircularProgress'
import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { ReadOnlyViewer } from '@/components/ui/ReadOnlyViewer'
import { apiUrl } from '@/lib/envService'
import { LessonContent } from '@/types/lessonContents'
import axios from 'axios'
import { ArrowLeft, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/features/store'
import { Lesson } from '@/types/lesson'
import { useAuth } from '@/contexts/AuthContext'
import LessonContents from '@/components/lessons/LessonContents'
import LessonsNavBarMobile from '../../components/lessons/LessonsNavBarMobile'
import SidebarNavigation from '../../components/lessons/SidebarNavigation'
import MobileSidebarToggleButton from '../../components/lessons/MobileSidebarToggleButton'

const LessonDetailPage = () => {
    const { user } = useAuth();
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const lessons = useSelector((state: RootState) => state.course.lessons);    
    const [lessonContents, setLessonContents] = useState<LessonContent[]>([]);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const { courseId, lessonId } = useParams();
    const [lessonIdValue, setLessonIdValue] = useState<string | null>(lessonId);

    useEffect(() => {
        // Fetch lesson details using lessonId
        const fetchLessonContents = async () => {
            try {
                const response = await axios.get(`${apiUrl}/lessons/lesson/${lessonIdValue}/contents`);
                setLessonContents(response.data?.data);
            } catch (error) {
                console.error("Error fetching lesson contents:", error);
            } finally {
                setLoading(false);
            }

            if (lessons.length > 0) {
                const foundLesson = lessons.find(lesson => lesson._id === lessonIdValue);
                setSelectedLesson(foundLesson || null);
            }
        };

        fetchLessonContents();
    }, [lessonIdValue]);


    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Layout>
            <div className="container mx-auto px-2 py-2 ">
                <div className="w-full mx-auto bg-transparent p-2 rounded-lg">
                    <div className="flex flex-row items-center gap-x-4">
                        <img
                            src={selectedLesson?.thumbnail}
                            alt={selectedLesson?.title}
                            className="h-16 w-16 rounded-full object-cover hidden md:block"
                        />
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">
                                {selectedLesson?.title}
                            </h1>
                            <p className="text-sm text-gray-800 dark:text-gray-400">
                                It helps you to browse courses, enroll, teach, or discover FluentQuest services.
                            </p>
                        </div>
                    </div>

                    {/* Mobile sidebar toggle button */}
                    <MobileSidebarToggleButton
                        setIsMobileNavOpen={setIsMobileNavOpen}
                        courseId={courseId}
                        lessonId={lessonId}
                    />

                    <div className="flex h-[25rem] md:h-[30rem] xl:h-[40rem] overflow-hidden rounded-lg  bg-white dark:bg-transparent shadow-xs">
                        {/* Sidebar navigation */}
                        <SidebarNavigation
                            lessonId={lessonIdValue}
                            lessons={lessons}
                            setLoading={setLoading}
                            setLessonIdValue={setLessonIdValue}
                        />

                        <LessonsNavBarMobile
                            isMobileNavOpen={isMobileNavOpen}
                            setIsMobileNavOpen={setIsMobileNavOpen}
                            lessons={lessons}
                            setLessonIdValue={setLessonIdValue}
                            setLoading={setLoading}
                        />

                        {/* Content area */}
                        <LessonContents lessonContents={lessonContents} loading={loading} />
                    </div>

                </div>
                <div className='w-full flex justify-end'>
                    <Link to={`/courses/${courseId}`} className='inline-flex items-center gap-2 hover:me-3 hover:text-primary'>
                        <ArrowLeft size={16} /> <span>Back to course</span>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export default LessonDetailPage

