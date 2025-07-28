// components/ui/ReadOnlyViewer.tsx

import React, { useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import InlineCode from '@editorjs/inline-code';
import Embed from '@editorjs/embed';
import SimpleImage from '@editorjs/image';

type ReadOnlyViewerProps = {
  content: OutputData;
  holderId?: string;
};

export const ReadOnlyViewer: React.FC<ReadOnlyViewerProps> = ({
  content,
  holderId = 'readonly-editor'
}) => {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: holderId,
        readOnly: true,
        data: content,
        tools: {
          header: Header,
          list: List,
          inlineCode: InlineCode,
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true,
              }
            }
          },
          image: SimpleImage,
        },
        onReady: () => {
          console.log('ReadOnly Viewer is ready');
        }
      });
    }

    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, [content]);

  return <div id={holderId} />;
};
