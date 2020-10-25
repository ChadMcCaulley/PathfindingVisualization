
import React from 'react'
import PropTypes from 'prop-types'
import { FaRecordVinyl, FaStreetView } from 'react-icons/fa'
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

  let icon = null
  if (isStart) icon = <FaStreetView className="node-icon"/>
  else if (targetNum !== null) icon = <FaRecordVinyl className="node-icon"/>

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
    >
      {icon}
    </div>
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