import { useEffect } from 'react'
import './App.css'
import Board from './components/Board'



function App () {
 
  useEffect(() => {
    document.title= 'Tic tac toe'
  },[])

  return (
    <>
      <h1>Tic tac toe</h1>
      <Board />
     
    </>
  )
}

export default App
