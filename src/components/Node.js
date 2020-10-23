
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { getNodeId, getNodeClassName } from '../utils/node'

export default class Node extends Component {
  static propTypes = {
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

  getType () {
    if (this.props.isStart) return 'start'
    else if (this.props.targetNum !== null) return 'target'
  }
  
  render () {
    const {
      size,
      col,
      row,
      targetNum,
      isStart,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      onDrop
    } = this.props

    return (
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        id={getNodeId(this.props)}
        className={getNodeClassName(this.props)}
        draggable={isStart || targetNum !== null}
        onDragStart={(e) => e.dataTransfer.setData('text/plain', `${getNodeId(this.props)} ${this.getType()}`)}
        onDrop={(e) => onDrop(e)}
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onMouseDown={() => onMouseDown(row, col) }
        onMouseEnter={() => onMouseEnter(row, col) }
        onMouseUp={() => onMouseUp() }
      />
    )
  }
}
