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


const LessonDetailPage = () => {
    useSessionCheck()
    const { courseId, lessonId } = useParams();
    const [lessonContents, setLessonContents] = useState<LessonContent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Fetch lesson details using lessonId
        const fetchLessonContents = async () => {
            try {
                const response = await axios.get(`${apiUrl}/lessons/lesson/${lessonId}/contents`);
                setLessonContents(response.data?.data);
            } catch (error) {
                console.error("Error fetching lesson contents:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLessonContents();
    }, [lessonId]);

    return (
        <Layout>
            <div className="container mx-auto px-2 py-2 ">
                <div className="w-full mx-auto bg-transparent p-2 rounded-lg">
                    <Link
                        to={`/courses/${courseId}`}
                        className="inline-flex items-center gap-2 hover:ms-3 hover:text-primary mb-2"
                    >
                        <ArrowLeft size={16} />
                        <span>Back to course</span>
                    </Link>

                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-300 text-start">Lesson Detail</h1>
                    <p className="text-sm  text-gray-800 dark:text-gray-400 text-start">It helps you to browse courses, enroll, teach or to discover FluentQuest services.</p>
                    <div className='w-full flex flex-1 justify-end '>

                        <Link to={`/courses/${courseId}/lesson/${lessonId}/content/add`}>
                            <Button className='flex items-center my-4'>
                                <Plus />
                                <span className="material-icons hidden md:block ">Add Content</span>
                            </Button>
                        </Link>
                    </div>

                    <div className='overflow-y-scroll h-[25rem] md:h-[30rem] xl:h-[40rem]'>
                        <div></div>
                        {lessonContents?.map((content: LessonContent) => {
                            return (
                                <div className=''>
                                    {content?.type === "text" && (<div key={content._id}>{content.value}</div>)}
                                    {content?.type !== "text" && (<div key={content._id}>
                                        <ReadOnlyViewer content={JSON.parse(content.value)} />
                                    </div>)}
                                </div>
                            )
                        })}
                        {lessonContents.length === 0 && !loading && <div className='w-full text-center justify-center rounded-2xl min-h-[100px] border pt-4'>No content available</div>}
                        {loading && <CircularProgress full={false} />}
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

