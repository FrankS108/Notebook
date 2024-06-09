import React, { useContext, useEffect, useRef, useState } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
//@ts-ignore
import Header from '@editorjs/header';
//@ts-ignore
import List from '@editorjs/list';
//@ts-ignore
import ImageTool from '@editorjs/image';
//@ts-ignore
import CheckList from '@editorjs/checklist';
//@ts-ignore
import NestedList from '@editorjs/nested-list';
import { BlocksContext } from '../context/BlocksContext';


const Editor: React.FC = () => {
    const editorRef = useRef<EditorJS | null>(null);
 // const [editorData, setEditorData] = useState<OutputData>({ blocks: [] });

    const { editorData, updateData, setRef } = useContext(BlocksContext);

    useEffect(() => {
        if (!editorRef.current) {
            editorRef.current = new EditorJS({
                holder: 'editorjs',
                tools: {
                    header: {
                        class: Header,
                        config: {
                            placeholder: 'Enter a header',
                            levels: [1, 2, 3],
                            defaultLevel: 1,
                        },
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                    },
                    image: {
                        class: ImageTool,
                        config: {
                            endpoints: {
                                byFile: 'http://localhost:8008/uploadFile',
                                byUrl: 'http://localhost:8008/fetchUrl',
                            },
                        },
                    },
                    nestedList: {
                        class: NestedList,
                    },
                    checkList: {
                        class: CheckList,
                    }
                },
                data: editorData,
                onChange: async () => {
                    const content = await editorRef.current?.save();
                    if (content) {
                        updateData(content);
                    }
                },
            });
            setRef(editorRef.current);
        }   
    }, [editorData]);

    return (
        <div>
            <div id="editorjs" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}></div>
            <pre>{JSON.stringify(editorData, null, 2)}</pre>
        </div>
    );
};

export default Editor;
