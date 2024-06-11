import './App.css'
import Editor from './components/Editor'
import Menu from './components/Menu'
import { BlocksProvider } from './context/BlocksProvider'
import { SocketProvider } from './context/SocketProvider'

function App() {


  return (
    <>
      <SocketProvider>
        <BlocksProvider>
          <Menu/>
          <Editor/>
        </BlocksProvider>
      </SocketProvider>
    </>
    
  )
}

export default App
