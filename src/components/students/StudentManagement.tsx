import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'

const StudentManagement = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Student Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                        View and manage your students. Track their progress and engagement.
                    </p>
                    <div className="mt-6">
                        <p className="text-gray-500 dark:text-gray-400">Student data will appear here.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default StudentManagement
