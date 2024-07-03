import Square from "./Square"
import { useTurn } from "../hooks/useTurn"
import { TURN } from "../constants"
import Snow from 'react-canvas-confetti/dist/presets/snow'



function Board() {

    const {
        board,
        boardReset,
        isBoardComplete,
        player,
        setTurn,
        winner } = useTurn()

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
                <Square isSelected={player === TURN.x.description} indexTurn={-1}>
                    {TURN.x.description}
                </Square>
                <Square isSelected={player === TURN.o.description} indexTurn={-2}>
                    {TURN.o.description}
                </Square>
            </div>

            {
                isBoardComplete && (
                    <strong>Completo</strong>
                )
            }
            
            {
                winner && (<Snow autorun={{ speed: 30 }} />)
            }
            <button className="btn" onClick={boardReset}>Reiniciar</button>
            
        </>
    )
}

export default Board