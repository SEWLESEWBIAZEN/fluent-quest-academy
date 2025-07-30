import { Lesson } from '@/types/lesson';
const SidebarNavigation = (
    { lessons, setLoading, setLessonIdValue }:
        { lessons: Lesson[], setLoading: (loading: boolean) => void, setLessonIdValue: (id: string) => void }) => {
    return (
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
    )
}

export default SidebarNavigation
