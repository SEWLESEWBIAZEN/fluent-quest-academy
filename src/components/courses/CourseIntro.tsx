import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Course } from '@/lib/types'
import ReactCountryFlag from 'react-country-flag'

interface CourseIntroProps {
    course: Course;
    courseLanguage: any;
    courseLevel: any;
    isEnrolled: boolean;
    progress: number;
    handleEnroll: () => void;
}

const CourseIntro: React.FC<CourseIntroProps> = ({ course, courseLanguage, courseLevel, isEnrolled, progress, handleEnroll }) => {
    return (
        <div className="md:col-span-2">

            <div className="flex items-center mb-4">
                <ReactCountryFlag
                    countryCode={courseLanguage?.flag || "US"}
                    svg
                    cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                    cdnSuffix="svg"
                    title={courseLanguage?.flag || "US"}
                    width={24}
                    height={12}
                />
                <span className="ms-2 text-lg text-gray-600 dark:text-gray-400">{courseLanguage?.name}</span>
                <div className={`ml-3 language-level-badge language-level-${courseLevel?.name?.toLowerCase()}`}>
                    {courseLevel?.name && (courseLevel?.name?.charAt(0).toUpperCase() + courseLevel?.name?.slice(1).toString())}
                </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300 mb-4">{course.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{course.description}</p>

            <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-medium">{course?.rating}</span>
                    <span className="text-gray-500 ml-1">({course?.studentCount ?? 0} students)</span>
                </div>
                <div className="flex items-center">
                    <span className="text-gray-500 mr-1">🕒</span>
                    <span>{(course.duration / 60).toFixed(2)} hours</span>
                </div>
                <div className="flex items-center">
                    <span className="text-gray-500 mr-1">📚</span>
                    <span>{course.totalLessons} lessons</span>
                </div>
            </div>

            {isEnrolled && (
                <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                        <span>Your progress</span>
                        <span>{progress}% complete</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>
            )}

            {!isEnrolled && (
                <Button onClick={handleEnroll} size="lg" className="mb-6">
                    {course.price === 0 ? 'Enroll for Free' : `Enroll for $${course.price.toFixed(2)}`}
                </Button>
            )}
        </div>
    )
}

export default CourseIntro
