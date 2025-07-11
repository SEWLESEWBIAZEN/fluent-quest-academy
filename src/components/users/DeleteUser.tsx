import React from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { apiUrl } from '@/lib/envService';
import { logout } from '@/config/firebase/authenticate';

const DeleteUser = ({ ids, accessToken }: { ids: { dbid: string, fbid: string }, accessToken: string }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    async function handleDeleteUser(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // Add your delete logic here
        setIsLoading(true);
        try {
            const response = await axios.delete(`${apiUrl}/users/user/delete?dbid=${ids?.dbid}&fbid=${ids?.fbid}`, {
                headers: {
                    "authtoken": accessToken
                }
            });
            if (response?.data?.success) {
                logout();
                toast({
                    title: "Success",
                    description: response?.data?.message ?? "User deleted successfully!",
                    variant: "default"
                });


            } else {
                toast({
                    title: "Error",
                    description: response?.data?.message || "Error Occured while deleting the user!",
                    variant: "destructive"
                });
            }

        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Error Occured while deleting the user!",
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
                <Button role='button' onClick={() => setIsDialogOpen(true)} variant="outline" className="border border-red-500 text-brand-900 dark:text-white hover:border-white hover:text-red-500 hover:bg-transparent">Delete</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete User</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this user? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => setIsDialogOpen(false)} variant="outline" className="border border-gray-300 text-gray-700 dark:text-gray-400 hover:border-gray-400 hover:text-gray-800">Cancel</Button>
                    <form onSubmit={handleDeleteUser}>
                        <Button disabled={isLoading} variant="outline" type='submit' className="border border-red-500 text-red-500 hover:border-red-600 hover:text-red-600">{isLoading ? "Deleting..." : "Delete"}</Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteUser


