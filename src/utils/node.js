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
function sortNodesByDistance(nodes) {
  return nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

export {
  getAllNodes,
  sortNodesByDistance
}