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

export {
  getAllNodes,
  sortNodesByDistance,
  getNodeId,
  getNodeClassName
}