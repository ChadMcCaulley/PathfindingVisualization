
import React from 'react'
import PropTypes from 'prop-types'
import { getNodeId, getNodeClassName } from '../utils/node'

export default function Node (props) {
  const {
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
      id={getNodeId(props)}
      className={getNodeClassName(props)}
      draggable={isStart || targetNum}
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
}