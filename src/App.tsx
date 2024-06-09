import './App.css'
import Editor from './components/Editor'
import Menu from './components/Menu'
import { BlocksProvider } from './context/BlocksProvider'

function App() {


  return (
    <>
      <BlocksProvider>
        <Menu/>
        <Editor/>
      </BlocksProvider>
    </>
    
  )
}

export default App
