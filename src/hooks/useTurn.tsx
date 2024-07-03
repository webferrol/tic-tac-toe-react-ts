import { useState } from "react"
import { calculateWinner } from "../helpers/calculate-winner"
import { TURN } from "../constants"


export function useTurn () {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [currentTurn, setCurrentTurn] = useState(TURN.o)
    const [winner, setWinner] = useState<string | null>(null)

    const setTurn = (index: number) => {
        if (board[index] !== null || winner) return

        const boardClone = structuredClone(board)
        boardClone[index] = currentTurn.description
        setBoard(boardClone)

        setWinner(calculateWinner(boardClone)) // The argument is the clone. setBoard is asynchronous and it can be a problem

        const changedTurn = currentTurn === TURN.o ? TURN.x : TURN.o
        setCurrentTurn(changedTurn)
    }

    return {
        board,
        player: currentTurn.description,
        setTurn,
        winner
    }
}