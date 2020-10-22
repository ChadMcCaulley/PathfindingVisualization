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

export {
  initializeGrid
}