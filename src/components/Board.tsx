import Square from './Square'
import { useTurn } from '../hooks/useTurn'
import { TURN } from '../constants'
import Snow from 'react-canvas-confetti/dist/presets/snow'
import '../App.css'
import MouseMoveComponent from './MouseMoveComponent'

function Board () {
  const {
    board,
    boardReset,
    isBoardComplete,
    player,
    setTurn,
    winner
  } = useTurn()

  const isCompleteWithoutWinner = () => (isBoardComplete && !winner)

  return (
        <>
            <MouseMoveComponent icon={player} />
            <section>
                <h1>
                    {winner ? `Gana ${winner}` : 'Tic tac toe'}
                </h1>
                <div className="board">
                    {
                        board.map((square: number, index: number) => (
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
                    <Square isSelected={player === TURN.x.description}>
                        {TURN.x.description}
                    </Square>
                    <Square isSelected={player === TURN.o.description}>
                        {TURN.o.description}
                    </Square>
                </div>
                <div className="controls">
                    <button className="btn" onClick={boardReset}>Reiniciar</button>
                </div>
            </section>

            { isCompleteWithoutWinner() && (<strong>Completo</strong>) }

            { winner && (<Snow autorun={{ speed: 30 }} />) }

        </>
  )
}

export default Board
