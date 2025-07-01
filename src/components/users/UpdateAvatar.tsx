import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { PencilIcon } from 'lucide-react'
import { Button } from '../ui/button';
import axios from 'axios';
import { apiUrl } from '@/lib/envService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const UpdateAvatar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const formData = new FormData();
  const { user } = useAuth()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/users/user/upload-avatar/${user?.userId}`, formData);
      if (response.status === 200) {
        // Handle successful avatar update
        toast({
          title: "Success",
          description: "Avatar updated successfully",
          variant: "primary"         
        });
      }
      setIsDialogOpen(false);
      console.log(response)
    } catch (error) {
      toast({
        title: "Error",
        description: error?.message || "Failed to update avatar",
        variant: "destructive"
      });

      
    } finally {
      setIsLoading(false);
    }

  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <PencilIcon className="w-8 h-8 group-hover:block text-gray-500 hidden cursor-pointer"  onClick={() => setIsDialogOpen(true)} /></DialogTrigger>
      <DialogContent>
        <DialogTitle>Update Avatar</DialogTitle>
        <form onSubmit={handleSubmit} className="">
          <input type="file" accept="image/*" className='cursor-pointer' onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              formData.append("file", file);
            }
          }} />

          <div className=' flex justify-end'>
            <Button disabled={isLoading} type="submit">{isLoading ? "Uploading..." : "Update"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateAvatar
