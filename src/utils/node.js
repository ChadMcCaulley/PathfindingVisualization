/**
 * Get all nodes in a 1D array
 * @param {2DArray} grid
 * @return {Array}
 */
const getAllNodes = (grid) => {
  return grid.reduce((accu, row) => {
    accu.push(...row)
    return accu
  }, [])
}

/**
 * Return the array of nodes sorted by their distance
 * @param {Array} nodes
 * @return {Array}
 */
const sortNodesByDistance = (nodes) => {
  return nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

/**
 * Get the id of the node based on its row and col
 * @param {Object} node
 * @return {Array}
 */
const getNodeId = (node) => {
  return `node-${node.row}-${node.col}`
}

/**
 * Get the value of the className for the node
 * @param {Object} node
 * @return {String}
 */
const getNodeClassName = (node) => {
  const { targetNum, isStart, isWall } = node
  let className = ['node']
  if (targetNum !== null) className.push('target-node')
  else if (isStart) className.push('start-node')
  else if (isWall) className.push('wall-node')
  return className.join(' ')
}

/**
 * Get the start node from the grid
 * @param {2DArray} grid
 * @return {Node}
 */
const getStartNode = (grid) => {
  for (const row of grid) {
    for (const node of row) {
      if (node.isStart) return node
    }
  }
  return null
}

/**
 * Get the end node from the grid
 * @param {2DArray} grid
 * @return {Node}
 */
const getTargetNode = (grid) => {
  for (const row of grid) {
    for (const node of row) {
      if (node.targetNum !== null) return node
    }
  }
  return null
}

/**
 * Get the end node from the grid
 * @param {2DArray} grid
 * @param {String} id
 * @return {Node}
 */
const getNodeById = (grid, id) => {
  for (const row of grid) {
    for (const node of row) {
      if (node.id === id) return node
    }
  }
  return null
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

/**
 * Generate initial node prop values based on the row and column of the node
 * @param {Integer} col 
 * @param {Integer} row
 * @param {Boolean} isStart
 * @param {Integer} targetNum 
 * @return {Object}
 */
const createNode = (col, row, isStart = false, targetNum = null) => {
  return {
    id: getNodeId({ col, row }),
    col,
    row,
    isStart,
    targetNum,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  }
}

/**
 * Set the classNamename for a given node
 * @param {Object} node
 * @param {String} className
 */
const setNodeClass = (node, className) => {
  document.getElementById(`node-${node.row}-${node.col}`).className = `node ${className}`
}

export {
  getAllNodes,
  sortNodesByDistance,
  getNodeId,
  getNodeClassName,
  toggleWallNodes,
  createNode,
  getStartNode,
  getTargetNode,
  getNodeById,
  setNodeClass
}