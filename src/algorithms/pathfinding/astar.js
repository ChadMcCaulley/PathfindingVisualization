import { getTargetNode, getStartNode, setNodeClass } from '../../utils/node'

/**
 * Get the initial grid values
 * @param {2DArray} grid 
 */
const getInitialGrid = (grid) => {
  return grid.map((row,rowIndex)  => {
    return row.map((node,nodeIndex)  => {
      return { ...node, f: 0, g: 0, h: 0, parent: null, pos: { x: nodeIndex, y: rowIndex}}
    })
  })
}

/**
 * Get the neighbors for the current node
 * @param {2DArray} grid
 * @param {Object} node
 */
const getNeighbors = (grid, node) => {
  const result = []
  const x = node.pos.x
  const y = node.pos.y
  
  if(grid[x-1] && grid[x-1][y]) result.push(grid[x-1][y])
  if(grid[x+1] && grid[x+1][y]) result.push(grid[x+1][y])
  if(grid[x][y-1] && grid[x][y-1]) result.push(grid[x][y-1])
  if(grid[x][y+1] && grid[x][y+1]) result.push(grid[x][y+1])

  return result
}

/**
 * Calculate the heuristic value for two nodes given their positions
 * @param {Object} pos0
 * @param {Object} pos1
 */
const calcHeuristic = (pos0, pos1) => {
  return Math.abs(pos1.x - pos0.x) + Math.abs(pos1.y - pos0.y)
}



/**
 * The A Star algorithm: Returns all visited nodes in the order which they were visted.
 * Provides a pointer for each visited node to its previous node
 * Backtracks through the pointers to produce the shortest path
 * @param {2DArray} originalGrid
 */
const aStar = (originalGrid) => {
  const grid = getInitialGrid(originalGrid)
  const startNode = getStartNode(grid)
  const endNode = getTargetNode(grid)
  const openList = []
  const closedList = []
  openList.push(startNode)
  while (openList.length > 0) {
    // Grab the lowest f(x) to process next'
    let lowIndex = 0;
    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[lowIndex].f) lowIndex = i
    }
    let currentNode = openList[lowIndex]

    // End case -- result has been found, return the traced path
    if (currentNode.pos === endNode.pos) {
      let curr = currentNode
      let result = []
      while (curr.parent) {
        result.push(curr)
        curr = curr.parent
      }
      return result.reverse()
    }

    // Normal case -- move currentNode from open to closed, process each of its neighbors
    openList.splice(lowIndex)
    closedList.push(currentNode)
    const neighbors = getNeighbors(grid, currentNode)
    for(var i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i]
      if(closedList.indexOf(neighbor) !== -1 || neighbor.isWall) continue
      let gScore = currentNode.g + 1
      let gScoreIsBest = false

      if(openList.indexOf(neighbor) === -1) {
        gScoreIsBest = true
        neighbor.h = calcHeuristic(neighbor.pos, endNode.pos)
        openList.push(neighbor)
      }
      else if (gScore < neighbor.g) gScoreIsBest = true 

      if(gScoreIsBest) {
        neighbor.parent = currentNode
        neighbor.g = gScore
        neighbor.f = neighbor.g + neighbor.h
      }
    }
  }
  return closedList
}

/**
 * Visualize the Astar algorithm
 * @param {2DArray} grid
 * @param {Boolean} showAnimations
 */
const visualizeAStar = (grid, showAnimations) => {
  const orderedVisistedNodes = aStar(grid)
  animateAStar(orderedVisistedNodes, true)
}

/**
 * Change the class assigned to the nodes visted to allow for the visualization of the a star algorithm
 * @param {Array} orderedVisistedNodes
 */
const animateAStar = (orderedVisistedNodes, showAnimations) => {
  if (!orderedVisistedNodes) return
  orderedVisistedNodes.forEach((node, i) => {
    if (showAnimations) setTimeout(() => setNodeClass(node, 'visited-node'), 10 * i)
    else setNodeClass(node, 'visited-node-no-ani')
  })
}

export {
  aStar,
  visualizeAStar
}