import { createNode } from './node'

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