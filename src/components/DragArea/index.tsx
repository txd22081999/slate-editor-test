import React from 'react'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'

const DragArea = () => {
  const eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e)
    console.log('Data: ', data)
  }

  const handleStart = (e: any) => {
    console.log(e)
  }

  const handleDrag = (e: any) => {
    console.log(e)
  }

  const handleStop = (e: any) => {
    console.log(e)
  }

  return (
    <Draggable
      axis='x'
      handle='.handle'
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      grid={[25, 25]}
      scale={1}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
    >
      <div>
        <div className='handle'>Drag from here</div>
        <div>This readme is really dragging on...</div>
      </div>
    </Draggable>
  )
}
