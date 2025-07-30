// components/ui/ReadOnlyViewer.tsx

import React, { useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import InlineCode from '@editorjs/inline-code';
import Embed from '@editorjs/embed';
import SimpleImage from '@editorjs/image';
import RawTool from '@editorjs/raw';
import LinkTool from '@editorjs/link';
import Checklist from '@editorjs/checklist'
import Quote from '@editorjs/quote';
import DrawingTool from '@blade47/editorjs-drawing-tool';
import AttachesTool from '@editorjs/attaches';
import Table from '@editorjs/table'
import AudioTool from '@furison-tech/editorjs-audio';
// import SKMFlipBox from 'skm-flipbox';
import Title from "title-editorjs";
import ToggleBlock from 'editorjs-toggle-block';
import Warning from '@editorjs/warning';
import Delimiter from '@coolbytes/editorjs-delimiter'

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
          attaches: {
            class: AttachesTool,
            config: {
              // endpoint: `${apiUrl}/lessons/lesson/uploadFileContent2`
            }
          },
          toggle: {
            class: ToggleBlock,
            inlineToolbar: true,
          },
          delimiter: {
            class: Delimiter,
            config: {
              styleOptions: ['star', 'dash', 'line'],
              defaultStyle: 'star',
              lineWidthOptions: [8, 15, 25, 35, 50, 60, 100],
              defaultLineWidth: 25,
              lineThicknessOptions: [1, 2, 3, 4, 5, 6],
              defaultLineThickness: 2,
            },

          },
          drawingTool: {
            class: DrawingTool,
          },
          title: Title,
          // carousel: {
          //   class: SKMFlipBox,
          //   inlineToolbar: true,
          // },
          audio: {
            class: AudioTool,

          },
          header: Header,
          linkTool: LinkTool,
          raw: RawTool,
          list: List,
          inlineCode: InlineCode,
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true,
              }
            }
          },
          table: Table,
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+O',
            config: {
              quotePlaceholder: 'Enter a quote',
            },
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

  return <div id={holderId} className="m-0 p-0"
    style={{ margin: 0, padding: 0 }} />;
};
