import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog'
import { UserData } from '@/lib/types'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import { apiUrl } from '@/lib/envService'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '../ui/use-toast'

const UserUpdateForm = ({ userData }: { userData: UserData }) => {

    const [name, setName] = useState(userData?.name ?? "")
    const [email, setEmail] = useState(userData?.email ?? "")
    const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber ?? "")
    const [username, setUsername] = useState(userData?.username ?? "")

    const [isLoading, setIsLoading] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)


    const { user } = useAuth()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        
        event.preventDefault();
        // Handle form submission logic here
        try {
            if (!user) throw new Error("User is not authenticated")
            setIsLoading(true)
        if (user?.email !== email) {        
                toast({
                    title: "Error",
                    description: "Use the same email as sign up.",
                    variant: "destructive"
                })
                setIsDialogOpen(false)
                return;

            }
            const response = await axios.put(`${apiUrl}/users/user/update/${userData?._id}`,
                {
                    ...(name && { name }),
                    // ...(email && { email }),
                    ...(phoneNumber && { phoneNumber }),
                    ...(username && { username })
                }, {
                headers: {
                    authToken: user?.accessToken,
                },
            });
            setIsLoading(false);

            if (response?.status === 200) {
                user.registered = true
                toast({
                    title: "🎉 Success",
                    description: response?.data?.message || "User Update Complete",
                    variant: "primary"
                });
                setIsLoading(false)
                setIsDialogOpen(false)
                return;
            }

            
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || error.message || "Unknown error",
                variant: "destructive",
            });
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <button className="bg-brand-900 text-white px-4 py-2 rounded-md" onClick={() => setIsDialogOpen(true)}>
                    Edit
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Edit User Profile</DialogTitle>
                <DialogDescription></DialogDescription>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="username">username</Label>
                        <Input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email"  readOnly value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input type="text" id="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className='flex justify-end mt-4'>
                        <Button disabled={isLoading} type="submit">{isLoading?"Updating..." : "Update"}</Button>
                    </div>
                </form>
            </DialogContent>

        </Dialog>

    )
}

export default UserUpdateForm
