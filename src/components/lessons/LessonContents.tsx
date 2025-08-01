import { LessonContent } from '@/types/lessonContents'
import { ReadOnlyViewer } from '../ui/ReadOnlyViewer'
import CircularProgress from '../layout/CircularProgress'

interface LessonContentsProps {
    lessonContents: LessonContent[];
    loading: boolean;
}
const LessonContents: React.FC<LessonContentsProps> = ({ lessonContents, loading }) => {
    return (
        <main className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-transparent">
            {lessonContents?.length ? (
                lessonContents.map((content: LessonContent) => (
                    <div key={content._id}>
                        {content.type === 'text' ? (
                            <p className="whitespace-pre-wrap text-gray-900 dark:text-gray-100">{content.value}</p>
                        ) : (
                            <ReadOnlyViewer key={content._id} content={JSON.parse(content?.value ?? "")} />
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
    )
}

export default LessonContents
