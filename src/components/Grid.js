import React, { Component } from 'react'
import Node from './Node'

export default class Grid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: [],
      mouseIsPressed: false
    }
  }

  componentDidMount() {
    const grid = initializeGrid(20, 20)
    this.setState({grid})
  }

  handleMouseDown(row, col) {
    const newGrid = toggleWallNodes(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true})
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = toggleWallNodes(this.state.grid, row, col);
    this.setState({grid: newGrid})
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false})
  }


  render() {
    const {grid} = this.state

    return (
      <div className="grid">
        {grid.map((row, rowId) => {
          return (
            <div key={rowId}>
              {row.map((node, nodeId) => {
                const {row, col, targetNum, isStart, isWall} = node;
                return (
                  <Node
                    key={nodeId}
                    col={col}
                    row={row}
                    targetNum={targetNum}
                    isStart={isStart}
                    isWall={isWall}
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
    )
  }
}




/**
 * Create the initial grid of nodes based on the given number or rows and columns
 * @param {Integer} numRows 
 * @param {Integer} numCols
 * @return {Array[Array]}
 */
const initializeGrid = (numRows, numCols) => {
  const grid = []
  for (let row = 0; row < numRows; row++) {
    const currentRow = [];
    for (let col = 0; col < numCols; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid
}

/**
 * Generate initial node prop values based on the row and column of the node
 * @param {Integer} col 
 * @param {Integer} row
 * @return {Object}
 */
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: false,
    targetNum: null,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  }
}

/**
 * Toggle whether or not a node is a wall
 * @param {Array[Array]} grid 
 * @param {Integer} row 
 * @param {Integer} col
 * @return {Array[Array]}
 */
const toggleWallNodes = (grid, row, col) => {
  const newGrid = grid.slice()
  const node = newGrid[row][col]
  const newNode = { ...node, isWall: !node.isWall }
  newGrid[row][col] = newNode
  return newGrid
}