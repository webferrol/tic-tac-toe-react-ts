import { useEffect, useState } from 'react'
import { calculateWinner } from '../helpers/calculate-winner'
import { TURN } from '../constants'

export function useTurn () {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [currentTurn, setCurrentTurn] = useState(TURN.x)
  const [winner, setWinner] = useState<string | null>(null)
  const [isBoardComplete, setIsBoardComplete] = useState(false)

  useEffect(() => {
    document.title = 'Tic tac toe'
  }, [])

  useEffect(() => {
    const boardComplete = () => board.every(item => item !== null)
    setIsBoardComplete(boardComplete())
  }, [board])

  const setTurn = (index: number) => {
    if (board[index] !== null || isBoardComplete || winner) return

    const boardClone = structuredClone(board)
    boardClone[index] = currentTurn.description
    setBoard(boardClone)

    const isWinner = calculateWinner(boardClone) // avoid asynchronism
    setWinner(isWinner)

    if (isWinner) return
    const changedTurn = currentTurn === TURN.o ? TURN.x : TURN.o
    setCurrentTurn(changedTurn)
  }

  const boardReset = () => {
    setBoard(Array(9).fill(null))
    setCurrentTurn(TURN.x)
    setWinner(null)
    setIsBoardComplete(false)
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
