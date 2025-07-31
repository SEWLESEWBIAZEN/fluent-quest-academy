import { Lesson } from '@/types/lesson';
import { List } from 'lucide-react';
import { useState } from 'react';

interface SidebarNavigationProps {
    lessons: Lesson[],
    setLoading: (loading: boolean) => void,
    setLessonIdValue: (id: string) => void,
    lessonId: string
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
    lessons,
    setLoading,
    setLessonIdValue,
    lessonId
}) => {

const [isOpen, setIsOpen] = useState(true);    
    return (
        <nav
            className="sidebar hidden md:block w-60 md:w-72 overflow-y-auto border-r border-gray-200 dark:border-gray-700 p-4"
            aria-label="Lessons Navigation"
        >
            <div className="mb-6">
                {/* Toggle Header */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full font-bold bg-primary dark:bg-transparent py-2 px-4 rounded-md flex items-center justify-between text-white focus:outline-none `}
                >
                    <div className="flex items-center gap-2">
                        <List className="w-5 h-5" />
                        <span>Lessons</span>
                    </div>
                    <span className="text-lg">{isOpen ? '▼' : '▶'}</span>
                </button>

                {/* Collapsible List */}
                <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] mt-4' : 'max-h-0'
                        }`}
                >
                    <ul className="space-y-3">
                        {lessons?.map((lesson: Lesson) => (
                            <li
                                key={lesson._id}
                                className={`flex items-center cursor-pointer rounded-md p-2 text-brand-900 dark:text-brand-700 hover:bg-brand-100 dark:hover:bg-brand-800 ${lessonId === lesson._id ? 'bg-brand-100 dark:bg-slate-800' : ''}`}
                                tabIndex={0}
                                role="button"
                                onClick={() => {
                                    setLoading(true);
                                    setLessonIdValue(lesson._id);
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
        </nav>
    )
}

export default SidebarNavigation
