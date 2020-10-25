import { createNode } from './node'

/**
 * Create the initial grid of nodes based on the given number or rows and columns
 * @param {Integer} numRows 
 * @param {Integer} numCols
 * @param {2DArray} currentGrid
 * @return {Array[Array]}
 */
const initializeGrid = (numRows, numCols, currentGrid = null) => {
  const grid = []
  const START_COL = Math.floor(Math.random() * (numCols-1))
  const START_ROW = Math.floor(Math.random() * (numRows-1))
  let END_COL = Math.floor(Math.random() * (numCols-1))
  let END_ROW = Math.floor(Math.random() * (numRows-1))
  let times = 0
  while (END_COL === START_COL && END_ROW === START_ROW && times < 10) {
    END_COL = Math.floor(Math.random() * (numCols-1))
    END_ROW = Math.floor(Math.random() * (numRows-1))
    times++
  }

  for (let row = 0; row < numRows; row++) {
    const currentRow = []
    for (let col = 0; col < numCols; col++) {
      let isStart = false
      let targetNum = null
      if (col === START_COL && row === START_ROW) isStart = true
      if (col === END_COL && row === END_ROW) targetNum = 1
      currentRow.push(createNode(col, row, isStart, targetNum))
    }
    grid.push(currentRow)
  }
  return grid
}

/**
 * Get the number nodes for the grid based on the window height
 * @param {Integer} windowHeight 
 * @param {Integer} nodeSize
 * @return {Integer}
 */
const getGridHeight = (windowHeight, nodeSize) => {
  const numNodes = Math.floor((windowHeight - 100) / nodeSize)
  return numNodes > 4 ? numNodes : 5 
}

/**
 * Get the number nodes for the grid based on the window width
 * @param {Integer} windowWidth 
 * @param {Integer} nodeSize
 * @return {Integer}
 */
const getGridWidth = (windowWidth, nodeSize) => {
  const numNodes = Math.floor((windowWidth - 50) / nodeSize)
  return numNodes > 4 ? numNodes : 5 
}

export {
  initializeGrid,
  getGridHeight,
  getGridWidth
}