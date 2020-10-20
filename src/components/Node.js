
import React from 'react'
import PropTypes from 'prop-types'

export default function Node(props) {
  const {
    col,
    row,
    targetNum,
    isStart,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp
  } = props

  const extraClassName = targetNum !== null
  ? 'target-node'
  : isStart
  ? 'start-node'
  : isWall
  ? 'wall-node'
  : '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
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