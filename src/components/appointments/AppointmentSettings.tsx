import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'

const AppointmentSettings = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Appointment Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your appointment settings, including availability and notifications.
          </p>
          <div className="mt-6">
            <p className="text-gray-500 dark:text-gray-400">Settings controls will appear here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AppointmentSettings
