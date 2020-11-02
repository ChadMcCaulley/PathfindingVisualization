import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from './Dropdown'

export default function Navbar (props) {
  const {
    updatePathfindingAlgo,
    onGenBinaryTreeMaze,
    onResetGrid,
    disableAlgoButtons,
    disabled
  } = props

  const pathfindingOptions = [
    { text: 'Dijkstra' },
    { text: 'A*', value: 'astar' }
  ]

  const handlePathfindingSubmit = (pathfinderName) => {
    disableAlgoButtons()
    const pathfindingAlgo = pathfindingOptions.filter(obj => obj.text === pathfinderName)[0]
    const value = 'value' in pathfindingAlgo ? pathfindingAlgo.value : pathfindingAlgo.text
    updatePathfindingAlgo(value)
  }

  return (
    <div className="navbar">
      <Dropdown
        label="Pathfinder"
        options={pathfindingOptions}
        btnText="Visualize"
        submitHandler={(value) => handlePathfindingSubmit(value) }
        disabled={disabled}
      />
      <button
        className="btn"
        onClick={onGenBinaryTreeMaze}
      >
        Binary Tree Maze
      </button>
      <button
        className="btn"
        onClick={onResetGrid}
      >
        Reset
      </button>
    </div>
  )
}

Navbar.propTypes = {
  onGenBinaryTreeMaze: PropTypes.func.isRequired,
  onResetGrid: PropTypes.func.isRequired,
  disableAlgoButtons: PropTypes.func,
  disabled: PropTypes.bool
}

Navbar.defaultProps = {
  disabled: false
}
