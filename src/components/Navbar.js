import React from 'react'

export default function Navbar (props) {
  const {
    onVisualizeDijkstra,
    onVisualizeAStar,
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
        onClick={onResetGrid}
      >
        Reset
      </button>
    </div>
  )
}
