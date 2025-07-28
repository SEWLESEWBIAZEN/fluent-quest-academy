import {useState } from 'react';
import { ReadOnlyViewer } from '../ui/ReadOnlyViewer';
import EditorComponent from '../ui/EditorComponent';
import { OutputData } from '@editorjs/editorjs';
import { useSessionCheck } from '@/hooks/useSessionCheck';

function AddLesson() {
  const [editorContent, setEditorContent] = useState<OutputData | null>(null); 
  const handleSave = async () => {
    // Make your API call here
  };

  return (
    <div className='w-full flex items-start justify-center min-h-screen p-4 gap-x-6'>
      <div className="w-full">        
        <EditorComponent  onChange={(content) => setEditorContent(content)} />
      </div>      
    </div>
  );
};

export default AddLesson;
