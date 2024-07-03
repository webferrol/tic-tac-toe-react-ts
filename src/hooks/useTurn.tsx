import { useState } from "react"
import { TURN } from "../constants"

function calculateWinner(squares: string[]) {
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


export function useTurn () {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [currentTurn, setCurrentTurn] = useState(TURN.o)
    const [winner, setWinner] = useState<string | null>(null)

    const setTurn = (index: number) => {
        if (board[index] !== null || winner) return

        const boardClone = structuredClone(board)
        boardClone[index] = currentTurn.description
        setBoard(boardClone)

        setWinner(calculateWinner(boardClone))

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