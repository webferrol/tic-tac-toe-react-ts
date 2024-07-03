import React from 'react'

type Props = {
    children: React.ReactNode,
    indexTurn: number,
    handleTurn?: (indexTurn: number) => void
    isSelected?: boolean
}

function Square ({ handleTurn, indexTurn, isSelected, children }: Props) {
  const handleClick = () => {
    if (handleTurn) handleTurn(indexTurn)
  }
  return (
        <div onClick={handleClick} className={isSelected ? 'square is-selected' : 'square'}>
            {children}
        </div>
  )
}
export default Square
