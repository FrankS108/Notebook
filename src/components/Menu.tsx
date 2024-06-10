import { useState, useContext } from 'react';
import { BlocksContext } from '../context/BlocksContext';
import { color } from 'html2canvas/dist/types/css/types/color';

const Menu = () => {
  const [productosOpen, setProductosOpen] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(false);

  const [isFileOpen, setFileOpen] = useState(false);

  const { exportToPDF, isDark, darkTheme } = useContext(BlocksContext);


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
    <div style={ isDark ? {backgroundColor:'#0f172a', color: '#fff'} : {backgroundColor:'#fff', color: '#000'}}>
        <div className={` mx-8 p-3 w-100 flex flex-row  gap-10 items-center		justify-center	`} >
          <div onClick={toggleFile} className='cursor-pointer '>
              <span className='text-lg'>File</span>
              <div className={`absolute shadow-2xl cursor-pointer text-black rounded-md py-2 px-4 mt-2 ${isFileOpen ? '' : 'hidden'} bg-slate-200	z-10`}>
                  <a onClick={exportPageToPDF} href="#" className="block my-2">Exportar a PDF</a>
                  <a href="#" className="block my-2">Option 2</a>
                  <a href="#" className="block my-2">Option 3</a>
                </div>
          </div>
          <div className='cursor-pointer'>
              <span className='text-lg'>About</span>
          </div>
          <div>
            { isDark && <button
              type="button" onClick={darkTheme}
              className="inline-block rounded bg-neutral-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 shadow-light-3 transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-light-2 focus:bg-neutral-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
              Light
            </button> }
            { !isDark && <button
              type="button" onClick={darkTheme}
              className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
              Dark
            </button> }
          </div>
        </div>
        
    </div>
  );
}

export default Menu;