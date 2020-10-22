import React from 'react'

export default function Navbar ({ onVisualizeDijkstra, onResetGrid }) {
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
        onClick={onResetGrid}
      >
        Reset
      </button>
    </div>
  )
}
