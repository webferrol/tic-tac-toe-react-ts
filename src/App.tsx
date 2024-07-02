import React, { useState } from 'react'
import './App.css'

const TURN = {
  x: Symbol('X'),
  o: Symbol('O')
}

const BOARD = Array(9).fill(null)

type Props = {
  children: React.ReactNode,
  indexTurn: number,
  handleTurn: (indexTurn: number) => void
}

function calculateWinner (squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function Square ({ handleTurn, indexTurn, children }: Props) {
  const handleClick = () => {
    handleTurn(indexTurn)
  }
  return (
    <div onClick={handleClick}>
      {children}
    </div>
  )
}

function App () {
  const [board, setBoard] = useState(BOARD)
  const [currentTurn, setCurrentTurn] = useState(TURN.o)
  const [isWinner, setIsWinner] = useState(false)

  const setTurn = (index: number) => {
    if (board[index] !== null || isWinner) return
    const boardClone = structuredClone(board)
    boardClone[index] = currentTurn.description
    setBoard(boardClone)
    const winner = calculateWinner(boardClone)
    if (winner) {
      setIsWinner(true)
    } else {
      setCurrentTurn(currentTurn === TURN.o ? TURN.x : TURN.o)
    }
  }

  return (
    <>
      <div>
        Jugador { currentTurn.description } {isWinner && 'Gana'}
      </div>
      <h1>Tic tac toe</h1>
      <div className="board">
       {
        board.map((square, index) => (
          <Square handleTurn={setTurn} indexTurn={index} key={index}>
            {square}
          </Square>)
        )
        }
      </div>
    </>
  )
}

export default App
