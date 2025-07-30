import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const MobileSidebarToggleButton = ({ setIsMobileNavOpen, courseId, lessonId }: { setIsMobileNavOpen: (isOpen: boolean) => void, courseId: string, lessonId: string }) => {
    return (
        <div className='w-full flex md:flex-1 justify-between md:justify-end'>
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
    )
}

export default MobileSidebarToggleButton
