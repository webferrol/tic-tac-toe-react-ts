type Props = {
    children: React.ReactNode,
    indexTurn: number,
    handleTurn: (indexTurn: number) => void
}

function Square({ handleTurn, indexTurn, children }: Props) {
    const handleClick = () => {
        handleTurn(indexTurn)
    }
    return (
        <div onClick={handleClick}>
            {children}
        </div>
    )
}
export default Square