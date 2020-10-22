import React, { Component } from 'react'
import Node from './Node'
import {dijkstra, getShortestPathNodes} from '../algorithms/dijkstra'
import {getNodeId, getNodeClassName} from '../utils/node'

const START_COL = 3
const START_ROW = 4
const END_COL = 15
const END_ROW = 15

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

  visualizeDijkstra () {
    const {grid} = this.state
    resetGrid(grid)
    const startNode = grid[START_ROW][START_COL]
    const endNode = grid[END_ROW][END_COL]
    const orderedVisistedNodes = dijkstra(grid, startNode, endNode)
    const shortestPathNodes = getShortestPathNodes(endNode)
    this.animateDijkstra(orderedVisistedNodes, shortestPathNodes)
  }

  /**
   * Change the class assigned to the nodes visted to allow for the visualization of the dijkstra algorithm
   * @param {Array} orderedVisistedNodes
   * @param {Array} shortestPathNodes
   */
  animateDijkstra(orderedVisistedNodes, shortestPathNodes) {
    for (let i = 0; i <= orderedVisistedNodes.length; i++) {
      if (i === orderedVisistedNodes.length) {
        setTimeout(() => {
          this.animateShortestPath(shortestPathNodes)
        }, 10 * i)
        return
      }
      setTimeout(() => {
        const node = orderedVisistedNodes[i]
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node visited-node'
      }, 10 * i)
    }
  }

  /**
   * Change the class of the nodes that make up the optimal or shortest path
   * @param {Array} shortestPathNodes 
   */
  animateShortestPath(shortestPathNodes) {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i]
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node shortest-path-node'
      }, 50 * i)
    }
  }


  render() {
    const {grid} = this.state

    return (
      <>
        <button style={{marginTop: 80}} onClick={() => this.visualizeDijkstra()}>
          Start Dijkstra
        </button>
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
      </>
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
 * Create the initial grid of nodes based on the given number or rows and columns
 * @param {2DArray} grid
 * @return {Array[Array]}
 */
const resetGrid = (grid) => {
  grid.forEach(row => {
    row.forEach(node => {
      node.distance = Infinity
      node.isVisited = false
      document.getElementById(getNodeId(node)).className = getNodeClassName(node)
    })
  })
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
    isStart: col === START_COL && row === START_ROW,
    targetNum: col === END_COL && row === END_ROW ? 1 : null,
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