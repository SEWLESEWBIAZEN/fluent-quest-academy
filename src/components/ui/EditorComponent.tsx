import React, { useRef, useEffect } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/image'
import Embed from '@editorjs/embed'
import { apiUrl } from '@/lib/envService';
import { Button } from '../ui/button';

type EditorComponentProps = {
  onChange?: (data: OutputData) => void;
  holderId?: string;
};


const EditorComponent: React.FC<EditorComponentProps> = ({
  onChange,
  holderId = 'editorjs-container'
}) => {
  
  const editorRef = useRef<EditorJS | null>(null);
  
  const handleSave = async () => {
    const data = await editorRef.current?.save();
    if (data && onChange) {
      onChange(data);
    }
    editorRef.current.clear();
  };

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: holderId,
        autofocus: true,
        tools: {
          header: {
            class: Header,
            inlineToolbar: ['link']
          },
          inlineCode: {
            class: InlineCode,
            shortcut: 'ctrl+SHIFT+M',
          },
          image: {
            class: SimpleImage,
            config: {
              endpoints: {
                byFile: `${apiUrl}/lessons/lesson/uploadFileContent`,
                byUrl: `${apiUrl}/lessons/content/fetchUrl`,
              }
            }
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true
              }
            }
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            }
          },
        },

        onChange: async () => {
        },
      

      });

      return () => {
         editorRef.current?.destroy();
        editorRef.current = null;
      };


    }
  }, [holderId]);


  return (
    <div className='w-full'>
      <div id={holderId} className="w-full h-auto bg-slate-100 rounded-3xl dark:bg-slate-800" />
      <Button className='mt-2' onClick={handleSave}>Save</Button >
    </div>
  )
};

export default EditorComponent;
