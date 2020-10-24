
import React from 'react'
import PropTypes from 'prop-types'
import { getNodeId, getNodeClassName } from '../utils/node'

export default function Node (props) {
  const getType = () => {
    if (props.isStart) return 'start'
    else if (props.targetNum !== null) return 'target'
  }

  const {
    id,
    size,
    col,
    row,
    targetNum,
    isStart,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    onDrop
  } = props

  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      id={id}
      className={getNodeClassName({ isStart, isWall, targetNum })}
      draggable={isStart || targetNum !== null}
      onDragStart={(e) => e.dataTransfer.setData('text/plain', `${getNodeId({ col, row })} ${getType()}`)}
      onDrop={(e) => onDrop(e)}
      onDragEnter={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
      onMouseDown={() => onMouseDown(row, col) }
      onMouseEnter={() => onMouseEnter(row, col) }
      onMouseUp={() => onMouseUp() }
    />
  )
}

Node.propTypes = {
  id: PropTypes.string.isRequired,
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  targetNum: PropTypes.number,
  isStart: PropTypes.bool.isRequired,
  isWall: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
}