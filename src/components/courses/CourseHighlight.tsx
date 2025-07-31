
interface CourseHighlightProps {
    course: any;
    courseLanguage: any;
}

const CourseHighlight: React.FC<CourseHighlightProps> = ({ course, courseLanguage }) => {
    const courseThumbnail = course?.thumbnail === "null" ? "/placeholder.svg" : course?.thumbnail;
    return (
        <div className="md:col-span-1">
            <div className="bg-background rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                <img
                    src={courseThumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="font-medium mb-4">What you'll learn</h3>
                    <ul className="space-y-2">
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Master key {courseLanguage?.name} vocabulary</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Build practical conversation skills</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Understand grammar fundamentals</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Develop cultural awareness</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CourseHighlight
