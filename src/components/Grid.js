import React, { Component } from 'react'
import Node from './Node'
import { visualizeDijkstra, visualizeAStar } from '../utils/algo'
import { toggleWallNodes, getNodeId, getNodeClassName, getNodeById } from '../utils/node'
import { initializeGrid, getGridHeight, getGridWidth } from '../utils/grid'


export default class Grid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: [],
      mouseIsPressed: false,
      nodeSize: 25
    }
    this.resizeGrid = this.resizeGrid.bind(this)
  }

  componentDidMount() {
    this.resizeGrid()
    window.addEventListener("resize", this.resizeGrid)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeGrid)
  }

  resizeGrid () {
    const { nodeSize } = this.state
    const gridHeight = getGridHeight(window.innerHeight, nodeSize)
    const gridWidth = getGridWidth(window.innerWidth, nodeSize)
    const grid = initializeGrid(gridHeight, gridWidth)
    this.setState({grid})
  }

  handleMouseDown(row, col) {
    const {grid} = this.state
    const initialNode = grid[row][col]
    if (initialNode.isStart || initialNode.targetNum !== null) return
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

  handleDrop(e) {
    const { grid } = this.state
    const data = e.dataTransfer.getData('text')
    const type = data.split(' ')[1]
    const prevNodeId = data.split(' ')[0]
    const updatedNodeId = e.target.id
    const previousNode = getNodeById(grid, prevNodeId)
    const updatedNode = getNodeById(grid, updatedNodeId)
    updatedNode.isWall = false
    if (type.toLowerCase() === 'start') {
      previousNode.isStart = false
      updatedNode.isStart = true
    } else {
      updatedNode.targetNum = previousNode.targetNum
      previousNode.targetNum = null
    }
    const newGrid = grid.map(row => {
      return row.map(node => {
        if (node.id === updatedNodeId) return updatedNode
        else if (node.id === prevNodeId) return previousNode
        return node
      })
    })
    this.setState({...this.state, grid: newGrid })
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
    const {grid, nodeSize} = this.state

    return (
      <div className="container">
        <div className="grid">
          {grid.map((row, rowId) => {
            return (
              <div key={rowId}>
                {row.map((node, nodeId) => {
                  const {row, col, targetNum, isStart, isWall, id} = node;
                  return (
                    <Node
                      id={id}
                      key={`${rowId}-${nodeId}`}
                      size={nodeSize}
                      col={col}
                      row={row}
                      targetNum={targetNum}
                      isStart={isStart}
                      isWall={isWall}
                      onDrop={(e) => this.handleDrop(e)}
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
