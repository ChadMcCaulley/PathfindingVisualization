import React, { Component } from 'react'
import Node from './Node'
import { visualizeDijkstra, visualizeAStar } from '../utils/algo'
import { toggleWallNodes, getNodeId, getNodeClassName } from '../utils/node'
import { initializeGrid } from '../utils/grid'


export default class Grid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: [],
      mouseIsPressed: false
    }
  }

  componentDidMount() {
    const grid = initializeGrid(25, 20)
    this.setState({grid})
  }

  handleMouseDown(row, col) {
    const {grid} = this.state
    const initialNode = grid[row][col]
    if (initialNode.isStart) {
      console.log('START NODE GRABBED')
    } else {
      const newGrid = toggleWallNodes(this.state.grid, row, col);
      this.setState({grid: newGrid, mouseIsPressed: true})
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = toggleWallNodes(this.state.grid, row, col);
    this.setState({grid: newGrid})
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false})
  }

  handleDrop() {
    console.log('Dropped')
  }

  visualizeAlgo (algoName) {
    const {grid} = this.state
    this.resetGrid()
    if (algoName.toLowerCase() === 'dijkstra') visualizeDijkstra(grid)
    if (algoName.toLowerCase() === 'astar') visualizeAStar(grid)
  }

  /**
   * Create the initial grid of nodes based on the given number or rows and columns
   * @param {Booelan} resetWalls
   * @return {Array[Array]}
   */
  resetGrid (resetWalls = false) {
    const {grid} = this.state
    grid.forEach(row => {
      row.forEach(node => {
        if (resetWalls) node.isWall = false
        node.distance = Infinity
        node.isVisited = false
        document.getElementById(getNodeId(node)).className = getNodeClassName(node)
      })
    })
  }


  render() {
    const {grid} = this.state

    return (
      <div className="container">
        <div className="grid">
          {grid.map((row, rowId) => {
            return (
              <div key={rowId}>
                {row.map((node, nodeId) => {
                  const {row, col, targetNum, isStart, isWall} = node;
                  return (
                    <Node
                      key={`${rowId}-${nodeId}`}
                      col={col}
                      row={row}
                      targetNum={targetNum}
                      isStart={isStart}
                      isWall={isWall}
                      onDragEnd={() => this.handleDrop()}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                      onMouseUp={() => this.handleMouseUp()}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
