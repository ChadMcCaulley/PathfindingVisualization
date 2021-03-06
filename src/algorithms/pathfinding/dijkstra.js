import {getAllNodes, sortNodesByDistance} from '../../utils/node'
import { getTargetNode, getStartNode, setNodeClass } from '../../utils/node'
import { animateShortestPath } from '../../utils/algo'

/**
 * The dijsktra algorithm: Returns all visited nodes in the order which they were visted.
 * Provides a pointer for each visited node to its previous node
 * Backtracks through the pointers to produce the shortest path
 * @param {2DArray} grid
 * @param {Node} startNode
 * @param {Node} endNode
 */
const dijkstra = (grid, startNode, endNode) => {
  const orderedVisistedNodes = []
  startNode.distance = 0
  let unvisitedNodes = getAllNodes(grid)
  while (!!unvisitedNodes.length) {
    unvisitedNodes = sortNodesByDistance(unvisitedNodes)
    const closestNode = unvisitedNodes.shift()
    if (closestNode.isWall) continue
    if (closestNode.distance === Infinity) return orderedVisistedNodes
    closestNode.isVisited = true
    orderedVisistedNodes.push(closestNode)
    if (closestNode === endNode) return orderedVisistedNodes
    updateUnvisitedNeighbors(closestNode, grid)
  }
}

/**
 * Update the distance and previous node values of all unvisited neighbor nodes
 * @param {Object} node 
 * @param {2DArray} grid 
 */
function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

/**
 * Get the four possible neighbors to a given node (could be as few as zero)
 * @param {Object} node 
 * @param {2DArray} grid 
 */
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

/**
 * Traverse back through the nodes based on their previous nodes to find the optimal route
 * @param {Object} endNode
 */
const getShortestPathNodes = (endNode) => {
  const shortestPathNodes = []
  let currentNode = endNode
  while (currentNode !== null) {
    shortestPathNodes.unshift(currentNode)
    currentNode = currentNode.previousNode
  }
  return shortestPathNodes
}

/**
 * Visualize the dijkstra algorithm
 * @param {2DArray} grid
 * @param {Boolean} showAnimations
 */
const visualizeDijkstra = (grid, showAnimations) => {
  const startNode = getStartNode(grid)
  const endNode = getTargetNode(grid)
  const orderedVisistedNodes = dijkstra(grid, startNode, endNode)
  const shortestPathNodes = getShortestPathNodes(endNode)
  animateDijkstra(orderedVisistedNodes, shortestPathNodes, showAnimations)
}

/**
 * Change the class assigned to the nodes visted to allow for the visualization of the dijkstra algorithm
 * @param {Array} orderedVisistedNodes
 * @param {Array} shortestPathNodes
 * @param {Boolean} showAnimations
 */
const animateDijkstra = (orderedVisistedNodes, shortestPathNodes, showAnimations) => {
  if (!orderedVisistedNodes || !shortestPathNodes) return
  orderedVisistedNodes.forEach((node, i) => {
    if (showAnimations) setTimeout(() => setNodeClass(node, 'visited-node'), 10 * i)
    else setNodeClass(node, 'visited-node-no-ani')
  })
  if (showAnimations) {
    setTimeout(() => animateShortestPath(shortestPathNodes, showAnimations), 10 * orderedVisistedNodes.length)
  } else animateShortestPath(shortestPathNodes, showAnimations)
}

export {
  visualizeDijkstra,
  dijkstra,
  getShortestPathNodes
}