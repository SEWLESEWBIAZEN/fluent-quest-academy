import React from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { apiUrl } from '@/lib/envService';
import { redirect } from 'react-router-dom';

interface DeleteCourseProps {
    id: string;
    accessToken: string;
}

const DeleteCourse: React.FC<DeleteCourseProps> = ({ id, accessToken }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    async function handleDeleteCourse(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // Add your delete logic here
        setIsLoading(true);
        try {
            const response = await axios.delete(`${apiUrl}/courses/delete/${id}`, {
                headers: {
                    "authtoken": accessToken
                }
            });
            if (response?.data?.success) {
                redirect("/courses")
                toast({
                    title: "Success",
                    description: response?.data?.message ?? "Course deleted successfully!",
                    variant: "default"
                });


            } else {
                toast({
                    title: "Error",
                    description: response?.data?.message || "Error Occured while deleting the course!",
                    variant: "destructive"
                });
            }

        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Error Occured while deleting the course!",
                variant: "destructive"
            });

        }
        finally {
            setIsLoading(false);
            setIsDialogOpen(false)
            return;
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button role='button' onClick={() => setIsDialogOpen(true)} variant="outline" size="sm" className="mt-4 border-red-600 text-red-700">Delete</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Course</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this course? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => setIsDialogOpen(false)} variant="outline" className="border border-gray-300 text-gray-700 dark:text-gray-400 hover:border-gray-400 hover:text-gray-800">Cancel</Button>
                    <form onSubmit={handleDeleteCourse}>
                        <Button disabled={isLoading} variant="outline" type='submit' className="border border-red-500 text-red-500 hover:border-red-600 hover:text-red-600">{isLoading ? "Deleting..." : "Delete"}</Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteCourse;
