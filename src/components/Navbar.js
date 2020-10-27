import React from 'react'
import PropTypes from 'prop-types'

export default function Navbar (props) {
  const {
    onVisualizeDijkstra,
    onVisualizeAStar,
    onGenBinaryTreeMaze,
    onResetGrid
  } = props
  return (
    <div className="navbar">
      <button
        className="btn"
        onClick={onVisualizeDijkstra}
      >
        Dijkstra
      </button>
      <button
        className="btn"
        onClick={onVisualizeAStar}
      >
        A*
      </button>
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
  onVisualizeDijkstra: PropTypes.func.isRequired,
  onVisualizeAStar: PropTypes.func.isRequired,
  onGenBinaryTreeMaze: PropTypes.func.isRequired,
  onResetGrid: PropTypes.func.isRequired
}
