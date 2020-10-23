
import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { getNodeId, getNodeClassName } from '../utils/node'

export default function Node (props) {
  useEffect(() => {
    return () => {
    }
  })
  
  const {
    size,
    col,
    row,
    targetNum,
    isStart,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    onDragEnd
  } = props

  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      id={getNodeId(props)}
      className={getNodeClassName(props)}
      draggable={isStart || targetNum !== null}
      onDragEnd={() => onDragEnd()}
      onMouseDown={() => onMouseDown(row, col) }
      onMouseEnter={() => onMouseEnter(row, col) }
      onMouseUp={() => onMouseUp() }
    />
  )
}

Node.propTypes = {
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  targetNum: PropTypes.number,
  isStart: PropTypes.bool.isRequired,
  isWall: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
}