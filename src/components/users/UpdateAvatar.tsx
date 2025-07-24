import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { PencilIcon } from 'lucide-react'
import { Button } from '../ui/button';
import axios from 'axios';
import { apiUrl } from '../../lib/envService';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from '../../hooks/use-toast';

const UpdateAvatar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const formData = new FormData();
  const { user } = useAuth()

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event?.target?.files?.[0];
    if (file) {
      formData.append("file", file);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    if (!formData.has("file")) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/users/user/upload-avatar/${user?.userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "authtoken": user?.accessToken || ""
        }
      });
      if (response.status === 200) {
        // Handle successful avatar update
        toast({
          title: "Success",
          description: "Avatar updated successfully",
          variant: "primary"
        });
      }
      setIsDialogOpen(false);

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
        <PencilIcon role='title' className="w-8 h-8 group-hover:block text-gray-500 hidden cursor-pointer" aria-label='Update Avatar' onClick={() => setIsDialogOpen(true)} /></DialogTrigger>
      <DialogContent className=" space-y-4 w-[90%] md:w-full">
        <DialogTitle data-testid="update-avatar-dialog-title">Update Avatar</DialogTitle>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            className="cursor-pointer w-full"
            onChange={handleFileChange}
          />

          <div className="flex justify-end">
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Uploading..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>

    </Dialog>

  )
}

export default UpdateAvatar

