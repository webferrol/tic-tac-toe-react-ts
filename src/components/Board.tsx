import { TURN } from "../constants"
import { useTurn } from "../hooks/useTurn"
import Square from "./Square"



function Board() {
    const {board, player, setTurn, winner} = useTurn()
    return (
        <>
            <div className="board">
                
                    {
                        board.map((square, index) => (
                            <Square 
                                handleTurn={setTurn}
                                indexTurn={index} 
                                key={index}>
                                {square}
                            </Square>)
                        )
                    }
               
            </div>
            <div className="players">
                <Square isSelected={player === TURN.x.description} indexTurn={9999}>
                    {TURN.x.description}
                </Square>
                <Square isSelected={player === TURN.o.description} indexTurn={99999}>
                    {TURN.o.description}
                </Square>
            </div>
            <div>
                {
                    winner && `Gana ${winner}`
                }
            </div>
        </>
    )
}

export default Board