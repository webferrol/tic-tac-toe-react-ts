import { useEffect, useState } from 'react'
import { calculateWinner } from '../helpers/calculate-winner'
import { TURN } from '../constants'

function clearLocalStorage () {
  localStorage.removeItem('board')
  localStorage.removeItem('turn')
}

export function useTurn () {
  const [board, setBoard] = useState(() => {
    const boardStorage = localStorage.getItem('board')
    return boardStorage === null ? Array(9).fill(null) : JSON.parse(boardStorage)
  })
  const [currentTurn, setCurrentTurn] = useState(() => {
    const turnStorage = localStorage.getItem('turn')
    return turnStorage === null
      ? TURN.x
      : turnStorage === TURN.x.description ? TURN.o : TURN.x
  })
  const [winner, setWinner] = useState<string | null>(null)
  const [isBoardComplete, setIsBoardComplete] = useState(false)

  useEffect(() => {
    document.title = 'Tic tac toe'
  }, [])

  useEffect(() => {
    const boardComplete = () => board.every((item: null) => item !== null)
    setIsBoardComplete(boardComplete())
    const isWinner = calculateWinner(board)
    setWinner(isWinner)
  }, [board])

  const setTurn = (index: number) => {
    if (board[index] !== null || isBoardComplete || winner) return

    const boardClone = structuredClone(board)
    boardClone[index] = currentTurn.description
    setBoard(boardClone)

    localStorage.setItem('board', JSON.stringify(boardClone))
    localStorage.setItem('turn', currentTurn.description as string)

    if (winner) return

    const changedTurn = currentTurn === TURN.o ? TURN.x : TURN.o
    setCurrentTurn(changedTurn)
  }

  const boardReset = () => {
    setBoard(Array(9).fill(null))
    setCurrentTurn(TURN.x)
    setWinner(null)
    setIsBoardComplete(false)
    clearLocalStorage()
  }

  return {
    board,
    boardReset,
    isBoardComplete,
    player: currentTurn.description,
    setTurn,
    winner
  }
}
