import { useState, useContext } from 'react';
import { BlocksContext } from '../context/BlocksContext';

const Menu = () => {
  const [productosOpen, setProductosOpen] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(false);

  const [isFileOpen, setFileOpen] = useState(false);

  const { exportToPDF } = useContext(BlocksContext);


  const toggleProductos = () => {
    setProductosOpen(!productosOpen);
    setServiciosOpen(false); // Asegurarse de que el otro submenú esté cerrado
  };

  const toggleServicios = () => {
    setServiciosOpen(!serviciosOpen);
    setProductosOpen(false); // Asegurarse de que el otro submenú esté cerrado
  };

  const toggleFile = () => {
    setFileOpen(!isFileOpen);
  }

  const exportPageToPDF = async () => {
    exportToPDF();
  }

  return (
    <div className="container mx-auto p-3 font flex flex-row  gap-10" >
        <div onClick={toggleFile} className='cursor-pointer'>
            <span className='text-lg'>File</span>
            <div className={`absolute shadow-2xl cursor-pointer text-black rounded-md py-2 px-4 mt-2 ${isFileOpen ? '' : 'hidden'} bg-slate-200	z-10`}>
                <a onClick={exportPageToPDF} href="#" className="block my-2">Exportar a PDF</a>
                <a href="#" className="block my-2">Producto 2</a>
                <a href="#" className="block my-2">Producto 3</a>
              </div>
        </div>
        <div className='cursor-pointer'>
            <span className='text-lg'>About</span>
        </div>
        
    </div>
  );
}

export default Menu;