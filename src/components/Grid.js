import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Node from './Node'
import { genBinaryTreeMaze } from '../algorithms/mazeGen/binaryTree'
import { visualizeDijkstra } from '../algorithms/pathfinding/dijkstra'
import { visualizeAStar } from '../algorithms/pathfinding/astar'
import { toggleWallNodes, getNodeId, getNodeClassName } from '../utils/node'
import { initializeGrid, getNumRows, getNumCols, swapNodes } from '../utils/grid'


export default class Grid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: [],
      mouseIsPressed: false,
      nodeSize: 25,
      prevDragOver: null,
      dragTimeout: null
    }
    this.resizeGrid = this.resizeGrid.bind(this)
  }

  static propTypes = {
    pathfindingAlgo: PropTypes.string,
    updatePathfindingAlgo: PropTypes.func.isRequired,
    enableAlgoButtons: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.resizeGrid()
    window.addEventListener("resize", this.resizeGrid)
  }

  componentDidUpdate(prevProps) {
    const { pathfindingAlgo } = this.props
    if (prevProps.pathfindingAlgo !== pathfindingAlgo) this.visualizeAlgo(pathfindingAlgo)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeGrid)
  }

  resizeGrid () {
    this.resetGrid()
    const { nodeSize, grid } = this.state
    const gridHeight = getNumRows(window.innerHeight, nodeSize)
    const gridWidth = getNumCols(window.innerWidth, nodeSize)
    const newGrid = initializeGrid(gridHeight, gridWidth, grid)
    this.setState({ grid: newGrid })
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

  handleDrop(event) {
    const { grid } = this.state
    const data = event.dataTransfer.getData('text')
    const dataValues = data.split(' ')
    const value = dataValues[2]
    const type = dataValues[1]
    const prevNodeId = dataValues[0]
    const updatedNodeId = event.target.id
    const newGrid = swapNodes(grid, prevNodeId, updatedNodeId, type, value)
    this.setState({...this.state, grid: newGrid })
  }

  async handleDragEnter(event) {
    event.preventDefault()
    const { prevDragOver, grid } = this.state
    const { pathfindingAlgo } = this.props
    const dragOver = event.target.id
    const draggedNode = event.node
    if (prevDragOver === dragOver || !dragOver) return
    this.setState({ prevDragOver: dragOver }, () => {
      if (!pathfindingAlgo) return
      const newGrid = grid.map(row => {
        return row.map(node => {
          if (draggedNode.type === 'start') node.isStart = node.id === dragOver
          else {
            node.targetNum = null
            if (node.id === dragOver && !node.isStart) node.targetNum = draggedNode.targetNum
          }
          return node
        })
      })

      this.visualizeAlgo(pathfindingAlgo, false, newGrid)
    })
  }

  /**
   * Visualize a pathfinding algorithm
   * @param {String} algoName 
   */
  visualizeAlgo (algoName, showAnimation = true, tempGrid = null) {
    if (!algoName) return
    this.resetGrid(false, true)
    let {grid} = this.state
    if (tempGrid) grid = tempGrid
    algoName = algoName.toLowerCase()
    if (algoName === 'dijkstra') visualizeDijkstra(grid, showAnimation)
    else if (algoName === 'astar') visualizeAStar(grid)
    this.props.enableAlgoButtons()
  }

  /**
   * Generate a maze using one of the maze generators
   * @param {String} mazeGenName 
   */
  generateMaze (mazeGenName) {
    this.resetGrid(true)
    const {grid} = this.state
    let newGrid = []
    if (mazeGenName.toLowerCase() === 'binary') newGrid = genBinaryTreeMaze(grid)
    this.setState({ ...this.state, grid: newGrid })
    this.resetGrid()
  }

  /**
   * Create the initial grid of nodes based on the given number or rows and columns
   * @param {Booelan} resetWalls
   * @return {Array[Array]}
   */
  resetGrid (resetWalls = false, resetAlgo = true) {
    this.props.enableAlgoButtons()
    if (resetAlgo) this.props.updatePathfindingAlgo(null)
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
                      onDragEnter={(e) => this.handleDragEnter(e)}
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
