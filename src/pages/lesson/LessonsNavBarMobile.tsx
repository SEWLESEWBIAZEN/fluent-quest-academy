import { Lesson } from '@/types/lesson'
import React from 'react'

const LessonsNavBarMobile = (
    { isMobileNavOpen, setIsMobileNavOpen, lessons, setLessonIdValue, setLoading }:
    {isMobileNavOpen: boolean, setIsMobileNavOpen: (open: boolean) => void, lessons: Lesson[], setLessonIdValue: (id: string) => void, setLoading: (loading: boolean) => void}) => {
    return (
        <div>
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

        </div>
    )
}

export default LessonsNavBarMobile
