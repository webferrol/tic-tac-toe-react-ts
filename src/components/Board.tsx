import { useTurn } from "../hooks/useTurn"
import Square from "./Square"



function Board() {
    const {board, player, setTurn, winner} = useTurn()
    return (
        <>
            <div className="board">
                {
                    board.map((square, index) => (
                        <Square handleTurn={setTurn} indexTurn={index} key={index}>
                            {square}
                        </Square>)
                    )
                }
            </div>
            <div>
                {
                    winner
                    ? `Gana ${winner}`
                    : `Juega ${player}`
                }
            </div>
        </>
    )
}

export default Board