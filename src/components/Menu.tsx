import { useState, useContext } from 'react';
import { BlocksContext } from '../context/BlocksContext';
import { SocketContext } from '../context/SocketContext';

const Menu = () => {
  const [productosOpen, setProductosOpen] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(false);
  const [connectionOpen, setConnectionOpen] = useState(false);

  const [isFileOpen, setFileOpen] = useState(false);

  const { room, connected } = useContext(SocketContext);

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
    setConnectionOpen(false); // Asegurarse de que el otro submenú esté cerrado
  }

  const toggleConnection = () => {
    setConnectionOpen(!connectionOpen);
    setFileOpen(false); // Asegurarse de que el otro submenú esté cerrado
  }

  const copyLinkToClipBoard = () => {
    navigator.clipboard.writeText(window.location.href);
  }

  const copyRoomToClipBoard = () => {
    navigator.clipboard.writeText(room);
  }

  const exportPageToPDF = async () => {
    exportToPDF();
  }

  return (
    <div style={ isDark ? {backgroundColor:'#0f172a', color: '#fff'} : {backgroundColor:'#fff', color: '#000'}}>
        <div className={` mx-8 p-3 w-100 flex flex-row  gap-10 items-center		justify-center	`} >
          <div onClick={toggleConnection} className='cursor-pointer '>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: '5px'}}>
                  {connected ? (
                    <svg  xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="#00d26a" d="M30 16c0 7.732-6.268 14-14 14S2 23.732 2 16S8.268 2 16 2s14 6.268 14 14"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="#dd2e44"/></svg>
                  )}
                </span>
                <span className='text-lg'>
                  Status
                </span>
              </div>
              <div className={`absolute shadow-2xl cursor-pointer text-black rounded-md py-2 px-4 mt-2 ${connectionOpen ? '' : 'hidden'} bg-slate-200	z-10`}>
                  <a style={{display: 'flex', alignItems: 'center'}} onClick={copyLinkToClipBoard} href="#" className="block my-2">Invitar por url<span style={{marginLeft: '5px'}}><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><g fill="currentColor"><path d="m14.828 12l1.415 1.414l2.828-2.828a4 4 0 0 0-5.657-5.657l-2.828 2.828L12 9.172l2.828-2.829a2 2 0 1 1 2.829 2.829zM12 14.829l1.414 1.414l-2.828 2.828a4 4 0 0 1-5.657-5.657l2.828-2.828L9.172 12l-2.829 2.829a2 2 0 1 0 2.829 2.828z"/><path d="M14.829 10.586a1 1 0 0 0-1.415-1.415l-4.242 4.243a1 1 0 1 0 1.414 1.414z"/></g></svg></span></a>
                  <a style={{display: 'flex', alignItems: 'center'}} onClick={copyRoomToClipBoard} href="#" className="block my-2">Copiar room<span style={{marginLeft: '5px'}}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 56 56"><path fill="currentColor" d="M8.746 37.703h7.149l-2.133 10.594a4.05 4.05 0 0 0-.07.75c0 1.148.796 1.781 1.898 1.781c1.125 0 1.945-.61 2.18-1.758l2.296-11.367h11.086L29.02 48.297c-.07.234-.093.516-.093.75c0 1.148.797 1.781 1.922 1.781s1.945-.61 2.18-1.758L35.3 37.703h8.367c1.289 0 2.18-.937 2.18-2.203c0-1.031-.703-1.875-1.758-1.875h-7.946L38.63 21.25h8.203c1.29 0 2.18-.937 2.18-2.203c0-1.031-.703-1.875-1.758-1.875H39.45l1.922-9.445c.023-.141.07-.446.07-.75c0-1.149-.82-1.805-1.945-1.805c-1.312 0-1.898.726-2.133 1.828l-2.062 10.172H24.215l1.922-9.445c.023-.141.07-.446.07-.75c0-1.149-.844-1.805-1.945-1.805c-1.336 0-1.946.726-2.157 1.828l-2.062 10.172h-7.687c-1.29 0-2.18.984-2.18 2.273c0 1.055.703 1.805 1.758 1.805h7.289l-2.485 12.375h-7.57c-1.29 0-2.18.984-2.18 2.273c0 1.055.703 1.805 1.758 1.805m12.14-4.078l2.509-12.375H34.48l-2.508 12.375Z"/></svg></span></a>
              </div>
          </div>
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