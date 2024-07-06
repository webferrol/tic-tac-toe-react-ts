import React, { useEffect, useState, CSSProperties } from 'react'

interface Props {
  isEnabled?: boolean,
  icon?: string
}

/**
 *  This component creates an element that follows the mouse cursor.
 *
 * @param {boolean} isEnabled - For example: a button can enable this component.
 * @returns {React.ReactElement} - React Element displaying whether the component is enabled or not.
 */
function MouseMoveComponent ({ isEnabled = true, icon = '' }: Props): React.ReactElement {
  const [position, setPosition] = useState({ clientX: 0, clientY: 0 })

  const STYLE: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: `translate(${position.clientX}px, ${position.clientY}px)`,
    transition: 'transform 0.1s',
    aspectRatio: '1 / 1',
    padding: '.2rem',
    borderColor: 'lightblue',
    borderStyle: 'solid',
    borderRadius: '50%'
  }

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent): void => {
      setPosition({ clientX: event.clientX, clientY: event.clientY })
    }

    if (isEnabled) window.addEventListener('mousemove', handleMouseMove)

    // Para ver que nos desubscribimos bien usar la función getEventListeners(window)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isEnabled])

  return (<div className='mouse-pointer' style={STYLE}>{icon}</div>)
}

export default MouseMoveComponent
