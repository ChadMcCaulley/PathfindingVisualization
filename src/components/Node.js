
import React from 'react'
import PropTypes from 'prop-types'
import { FaRecordVinyl, FaStreetView } from 'react-icons/fa'
import { getNodeId, getNodeClassName } from '../utils/node'

export default function Node (props) {
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

  let icon = null
  if (isStart) icon = <FaStreetView className="node-icon"/>
  else if (targetNum !== null) icon = <FaRecordVinyl className="node-icon"/>

  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      id={getNodeId(props)}
      className={getNodeClassName(props)}
      draggable={isStart || targetNum}
      onDragEnd={() => onDragEnd()}
      onMouseDown={() => onMouseDown(row, col) }
      onMouseEnter={() => onMouseEnter(row, col) }
      onMouseUp={() => onMouseUp() }
    >
      {icon}
    </div>
  )
}

Node.propTypes = {
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  targetNum: PropTypes.number,
  isStart: PropTypes.bool.isRequired,
  isWall: PropTypes.bool.isRequired,
}