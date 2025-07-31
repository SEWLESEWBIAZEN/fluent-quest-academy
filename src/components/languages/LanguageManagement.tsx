import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

const LanguageManagement = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Language Management</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex w-full'>
                    <p className="text-gray-600 dark:text-gray-400 w-[80%]">
                        Manage the languages available in the application.
                        Manage the languages available in the application.
                        Manage the languages available in the application.
                    </p>
                    <div className='flex w-[20%] justify-end'>
                        <Button>Add Language</Button>
                    </div>
                </div>
                <div className="mt-6">
                    <p className="text-gray-500 dark:text-gray-400">Language controls will appear here.</p>

                </div>
            </CardContent>
        </Card>
    )
}

export default LanguageManagement
