import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const ApplicationSettings = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Application Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage global application settings, languages, and feature toggles.
                </p>
                <div className="mt-6">
                    <p className="text-gray-500 dark:text-gray-400">Settings controls will appear here.</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default ApplicationSettings
