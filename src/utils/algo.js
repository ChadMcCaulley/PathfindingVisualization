import {dijkstra, getShortestPathNodes} from '../algorithms/pathfinding/dijkstra'
// import {astar} from '../algorithms/pathfinding/astar'
import { getTargetNode, getStartNode } from '../utils/node'

const state = {
  showAnimations: true
}
/**
 * Visualize the dijkstra algorithm
 * @param {2DArray} grid
 * @param {Boolean} showAnimations
 */
const visualizeDijkstra = (grid, showAnimations) => {
  state.showAnimations = showAnimations
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
 */
const animateDijkstra = (orderedVisistedNodes, shortestPathNodes) => {
  if (!orderedVisistedNodes || !shortestPathNodes) return
  for (let i = 0; i <= orderedVisistedNodes.length; i++) {
    if (i === orderedVisistedNodes.length && state.showAnimations) {
      setTimeout(() => {
        animateShortestPath(shortestPathNodes)
      }, 10 * i)
    } else if (i === orderedVisistedNodes.length) {
      animateShortestPath(shortestPathNodes)
    } else if (state.showAnimations) {
      setTimeout(() => {
        const node = orderedVisistedNodes[i]
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node visited-node'
      }, 10 * i)
    } else {
      const node = orderedVisistedNodes[i]
      document.getElementById(`node-${node.row}-${node.col}`).className = 'node visited-node'
    }
  }
}

/**
 * Visualize the dijkstra algorithm
 * @param {2DArray} grid
 */
const visualizeAStar = (grid) => {
}

/**
 * Change the class of the nodes that make up the optimal or shortest path
 * @param {Array} shortestPathNodes
 * @param {Boolean} showAnimations
 */
const animateShortestPath = (shortestPathNodes) => {
  for (let i = 0; i < shortestPathNodes.length; i++) {
    // setTimeout(() => {
      const node = shortestPathNodes[i]
      document.getElementById(`node-${node.row}-${node.col}`).className = 'node shortest-path-node'
    // }, 50 * i)
  }
}

export {
  animateDijkstra,
  animateShortestPath,
  visualizeAStar,
  visualizeDijkstra
}