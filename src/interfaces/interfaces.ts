import EditorJS, { OutputData } from '@editorjs/editorjs';

export interface Block {
    id: string;
    type: string;
    data: Object;
}

export interface ContainerBlocks {
    time: number;
    blocks: Block[];
    version: string;
}

export interface BlocksContext {
    editorData: OutputData;
    updateData: (newData: OutputData) => void;
    setRef: (newRef: EditorJS | null) => void;
    exportToPDF: () => void;
    darkTheme: () => void;
    isDark: boolean;
}