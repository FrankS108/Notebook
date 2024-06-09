import { BlocksContext } from "./BlocksContext"
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { useState, useRef } from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import edjsHTML from 'editorjs-html';


interface props {
    children: JSX.Element | JSX.Element[];
}

export const BlocksProvider = ({ children } : props) => {
    const editorRef = useRef<EditorJS | null>(null);
    const [editorData, setEditorData] = useState<OutputData>({ blocks: [] });

    const updateData = (newData: OutputData) => {
        setEditorData(newData);
    };

    const setRef = (newRef: EditorJS | null) => {
        editorRef.current = newRef;
    }

    const exportToPDF = async () => {
        if (!editorRef.current) return;
        const edjsParser = edjsHTML();
        const htmlArray = edjsParser.parse(editorData); 
        const htmlBlock = htmlArray.join('')
        const htmlContent = `<div>${htmlBlock}</div>`;
        const element = document.createElement('div');
        element.innerHTML = htmlContent;
        element.style.width = '210mm'; // Ancho de la página A4 en milímetros
        element.style.padding = '10mm'; // Añade un poco de padding para asegurar el contenido
        document.body.appendChild(element);
    
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = 210; // Ancho de la página A4 en milímetros
        const pdfHeight = 297; // Alto de la página A4 en milímetros
        const canvas = await html2canvas(element, { scale: 2 });
    
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
        let heightLeft = imgHeight;
    
        let position = 0;
    
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
    
        while (heightLeft >= 0) {
          position -= pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
    
        pdf.save('document.pdf');
        document.body.removeChild(element);
      };

    return (
        <BlocksContext.Provider value={{
            editorData,
            updateData,
            setRef,
            exportToPDF
        }}>
            { children }
        </BlocksContext.Provider>
    )
}

