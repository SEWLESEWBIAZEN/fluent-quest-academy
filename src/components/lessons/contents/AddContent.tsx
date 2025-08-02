import { useState } from 'react';
import { ReadOnlyViewer } from '../../ui/ReadOnlyViewer';
import EditorComponent from '../../ui/EditorComponent';
import { OutputData } from '@editorjs/editorjs';
import { useSessionCheck } from '@/hooks/useSessionCheck';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { apiUrl } from '@/lib/envService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

function AddContent() {
  const [editorContent, setEditorContent] = useState<OutputData | null>(null);
  const { lessonId, courseId } = useParams();
  const {user} = useAuth()
  const handleSave = async () => {
    try{
      const response = await axios.post(`${apiUrl}/lessons/lesson/content/create`, 
        {
          lessonId:lessonId,
          type:"image",
          value:JSON.stringify(editorContent)
        },
        {
          headers: {
            'Content-Type': 'application/json',
            "authToken":user?.accessToken??""
          }
        }
      );
      if(response?.data?.success){
        toast({
          title: 'Success',
          description: 'Content created successfully',
          variant: 'primary'
        });
      }
      else{
        toast({
          title: 'Error',
          description: response?.data?.message || 'Failed to create content',
          variant: 'destructive'
        });
      }
    }
    catch(err){
      
      toast({
        title: 'Error',
        description: 'Failed to create content',
        variant: 'destructive'
      });

    }
  };


  return (
    <>
      <div className='w-full flex items-start justify-center h-auto p-4 gap-x-6'>
        <EditorComponent onChange={(content) => setEditorContent(content)} />
      </div>
      <div className='w-full my-2 flex flex-1 gap-2 justify-end items-center'>
        <Link to={`/courses/${courseId}/lesson/${lessonId}`} className='flex items-center gap-2 hover:ms-3 hover:text-primary flex-1 justify-end'>
                    <ArrowLeft size={16} /> <span>Back</span>
                </Link>
        <Button className='mt-2' onClick={handleSave}>Create Content</Button>
      </div>
    </>
  );
};

export default AddContent;
