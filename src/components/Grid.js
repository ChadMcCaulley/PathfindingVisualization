import React, { Component } from "react";
import PropTypes from "prop-types";
import Node from "./Node";
import { genBinaryTreeMaze } from "../algorithms/mazeGen/binaryTree";
import { visualizeDijkstra } from "../algorithms/pathfinding/dijkstra";
import { visualizeAStar } from "../algorithms/pathfinding/astar";
import { visualizeBFS } from "../algorithms/pathfinding/breadth-first"; // NEW
import { visualizeDFS } from "../algorithms/pathfinding/depth-first"; // NEW
import { toggleWallNodes, getNodeId, getNodeClassName } from "../utils/node";
import {
  initializeGrid,
  getNumRows,
  getNumCols,
  swapNodes,
} from "../utils/grid";
import { clearAllTimeouts } from "../utils/algo";

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
      nodeSize: 25,
      prevDragOver: null,
      dragTimeout: null,
    };
    this.resizeGrid = this.resizeGrid.bind(this);
  }

  static propTypes = {
    pathfindingAlgo: PropTypes.string,
    updatePathfindingAlgo: PropTypes.func.isRequired,
    enableAlgoButtons: PropTypes.func.isRequired,
    isPaused: PropTypes.bool,
  };

  componentDidMount() {
    this.resizeGrid();
    window.addEventListener("resize", this.resizeGrid);
  }

  componentDidUpdate(prevProps) {
    const { pathfindingAlgo } = this.props;
    if (pathfindingAlgo && prevProps.pathfindingAlgo !== pathfindingAlgo) {
      this.visualizeAlgo(pathfindingAlgo);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeGrid);
  }

  resizeGrid() {
    this.resetGrid();
    const { nodeSize, grid } = this.state;
    const gridHeight = getNumRows(window.innerHeight, nodeSize);
    const gridWidth = getNumCols(window.innerWidth, nodeSize);
    const newGrid = initializeGrid(gridHeight, gridWidth, grid);
    this.setState({ grid: newGrid });
  }

  handleMouseDown(row, col) {
    const { grid } = this.state;
    const initialNode = grid[row][col];
    if (initialNode.isStart || initialNode.targetNum !== null) return;
    const newGrid = toggleWallNodes(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = toggleWallNodes(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  handleDrop(event) {
    const { grid } = this.state;
    const data = event.dataTransfer.getData("text");
    const dataValues = data.split(" ");
    const prevNodeId = dataValues[0];
    const type = dataValues[1];
    const value = dataValues[2];
    const updatedNodeId = event.target.id;
    const newGrid = swapNodes(grid, prevNodeId, updatedNodeId, type, value);
    this.setState({ grid: newGrid });
  }

  handleDragEnter(event) {
    event.preventDefault();
    const { prevDragOver, grid } = this.state;
    const { pathfindingAlgo } = this.props;
    const dragOver = event.target.id;
    const draggedNode = event.node;

    if (prevDragOver === dragOver || !dragOver) return;

    this.setState({ prevDragOver: dragOver }, () => {
      if (!pathfindingAlgo) return;
      const newGrid = grid.map((row) => {
        return row.map((node) => {
          if (draggedNode.type === "start") node.isStart = node.id === dragOver;
          else {
            node.targetNum = null;
            if (node.id === dragOver && !node.isStart)
              node.targetNum = draggedNode.targetNum;
          }
          return node;
        });
      });

      this.visualizeAlgo(pathfindingAlgo, false, newGrid);
    });
  }

  /**
   * Visualize a pathfinding algorithm
   */
  visualizeAlgo(algoName, showAnimation = true, tempGrid = null) {
    if (!algoName) return;
    this.resetGrid(false, true);

    const gridToUse = tempGrid || this.state.grid;
    const normalizedAlgoName = algoName.toLowerCase();

    const onFinish = () => this.props.enableAlgoButtons();

    const checkIsPaused = () => this.props.isPaused;

    switch (normalizedAlgoName) {
      case "dijkstra":
        visualizeDijkstra(gridToUse, showAnimation, onFinish, checkIsPaused);
        break;
      case "astar":
        visualizeAStar(gridToUse, showAnimation, onFinish, checkIsPaused);
        break;
      case "bfs":
        visualizeBFS(gridToUse, showAnimation, onFinish, checkIsPaused);
        break;
      case "dfs":
        visualizeDFS(gridToUse, showAnimation, onFinish, checkIsPaused);
        break;
      default:
        console.warn(`Unknown algorithm: ${algoName}`);
        this.props.enableAlgoButtons();
        break;
    }
  }

  /**
   * Generate a maze using one of the maze generators
   */
  generateMaze(mazeGenName) {
    this.resetGrid(true);
    const { grid } = this.state;
    let newGrid = [];
    if (mazeGenName.toLowerCase() === "binary") {
      newGrid = genBinaryTreeMaze(grid);
    }
    this.setState({ grid: newGrid }, () => {
      this.resetGrid();
    });
  }

  /**
   * Create the initial grid of nodes based on the given number or rows and columns
   */
  resetGrid(resetWalls = false, resetAlgo = true) {
    clearAllTimeouts();

    this.props.enableAlgoButtons();
    if (resetAlgo) this.props.updatePathfindingAlgo(null);
    const { grid } = this.state;

    grid.forEach((row) => {
      row.forEach((node) => {
        if (resetWalls) node.isWall = false;
        node.distance = Infinity;
        node.isVisited = false;

        const domElement = document.getElementById(getNodeId(node));
        if (domElement) {
          domElement.className = getNodeClassName(node);
        }
      });
    });
  }

  render() {
    const { grid, nodeSize } = this.state;

    return (
      <div className="container">
        <div className="grid">
          {grid.map((row, rowIdx) => (
            <div key={rowIdx}>
              {row.map((node, colIdx) => (
                <Node
                  id={node.id}
                  key={`${rowIdx}-${colIdx}`}
                  size={nodeSize}
                  col={node.col}
                  row={node.row}
                  targetNum={node.targetNum}
                  isStart={node.isStart}
                  isWall={node.isWall}
                  onDrop={(e) => this.handleDrop(e)}
                  onDragEnter={(e) => this.handleDragEnter(e)}
                  onMouseDown={(r, c) => this.handleMouseDown(r, c)}
                  onMouseEnter={(r, c) => this.handleMouseEnter(r, c)}
                  onMouseUp={() => this.handleMouseUp()}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
