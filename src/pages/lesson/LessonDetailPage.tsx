import CircularProgress from '@/components/layout/CircularProgress'
import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { ReadOnlyViewer } from '@/components/ui/ReadOnlyViewer'
import { useSessionCheck } from '@/hooks/useSessionCheck'
import { apiUrl } from '@/lib/envService'
import { LessonContent } from '@/types/lessonContents'
import axios from 'axios'
import { ArrowLeft, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/features/store'
import { Lesson } from '@/types/lesson'

const LessonDetailPage = () => {
    const lessons = useSelector((state: RootState) => state.course.lessons);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);



    useSessionCheck()
    const { courseId, lessonId } = useParams();
    const [lessonIdValue, setLessonIdValue] = useState<string | null>(lessonId);
    const [lessonContents, setLessonContents] = useState<LessonContent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

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
                    <div className='w-full flex md:flex-1 justify-between md:justify-end'>
                        {/* Mobile sidebar toggle button */}
                        <button
                            className="md:hidden inline-flex items-center px-3 py-2 text-gray-700 dark:text-gray-200"
                            onClick={() => setIsMobileNavOpen(true)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <Link to={`/courses/${courseId}/lesson/${lessonId}/content/add`}>
                            <Button className='flex items-center my-4'>
                                <Plus />
                                <span className="material-icons hidden md:block ">Add Content</span>
                            </Button>
                        </Link>
                    </div>

                    <div className="flex h-[25rem] md:h-[30rem] xl:h-[40rem] overflow-hidden rounded-lg  bg-white dark:bg-transparent shadow-xs">
                        {/* Sidebar navigation */}
                        <nav
                            className="sidebar hidden md:block w-60 md:w-72 overflow-y-auto border-r border-gray-200 dark:border-gray-700 p-4"
                            aria-label="Lessons Navigation"
                        >
                            <ul className="space-y-3">
                                {lessons?.map((lesson: Lesson) => (
                                    <li
                                        key={lesson._id}
                                        className="flex items-center cursor-pointer rounded-md p-2 text-brand-900 dark:text-brand-700 hover:bg-brand-100 dark:hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                                        tabIndex={0}
                                        role="button"
                                        onClick={() => {
                                            setLoading(true);
                                            setLessonIdValue(lesson._id)
                                        }}
                                    >
                                        {/* Icon based on lesson type */}
                                        <span className="mr-2 text-lg">
                                            {lesson.type === 'article' && '📝'}
                                            {lesson.type === 'video' && '🎥'}
                                            {lesson.type === 'quiz' && '❓'}
                                            {!['article', 'video', 'quiz'].includes(lesson.type) && '📄'}
                                        </span>
                                        <span className="truncate">{lesson.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </nav>



                        {/* Mobile Sidebar Drawer */}
                        {isMobileNavOpen && (
                            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden" onClick={() => setIsMobileNavOpen(false)}>
                                <div
                                    className="absolute top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 p-4 shadow-xl"
                                    onClick={(e) => e.stopPropagation()} // prevent background click from closing it
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Lessons</h2>
                                        <button onClick={() => setIsMobileNavOpen(false)} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">
                                            ✕
                                        </button>
                                    </div>
                                    <ul className="space-y-3">
                                        {lessons?.map((lesson: Lesson) => (
                                            <li
                                                key={lesson._id}
                                                className="flex items-center cursor-pointer rounded-md p-2 text-brand-900 dark:text-brand-700 hover:bg-brand-100 dark:hover:bg-brand-800"
                                                onClick={() => {
                                                    setLessonIdValue(lesson._id)
                                                    setIsMobileNavOpen(false)
                                                    setLoading(true)
                                                }}
                                            >
                                                <span className="mr-2 text-lg">
                                                    {lesson.type === 'article' && '📝'}
                                                    {lesson.type === 'video' && '🎥'}
                                                    {lesson.type === 'quiz' && '❓'}
                                                    {!['article', 'video', 'quiz'].includes(lesson.type) && '📄'}
                                                </span>
                                                <span className="truncate">{lesson.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}



                        {/* Content area */}
                        <main className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-transparent">
                            {lessonContents?.length ? (
                                lessonContents.map((content: LessonContent) => (
                                    <div key={content._id}>
                                        {content.type === 'text' ? (
                                            <p className="whitespace-pre-wrap text-gray-900 dark:text-gray-100">{content.value}</p>
                                        ) : (
                                            <ReadOnlyViewer content={JSON.parse(content?.value ?? "")} />
                                        )}
                                    </div>
                                ))
                            ) : !loading ? (
                                <div className="w-full text-center rounded-2xl min-h-[100px] border border-dashed border-gray-300 dark:border-gray-600 pt-4 text-gray-500 dark:text-gray-400">
                                    No content available
                                </div>
                            ) : (
                                <div className="flex justify-center">
                                    <CircularProgress full={false} />
                                </div>
                            )}
                        </main>
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

