import {dijkstra, getShortestPathNodes} from '../algorithms/dijkstra'
import { getTargetNode, getStartNode } from '../utils/node'


/**
 * Change the class assigned to the nodes visted to allow for the visualization of the dijkstra algorithm
 * @param {Array} orderedVisistedNodes
 * @param {Array} shortestPathNodes
 */
const visualizeDijkstra = (grid) => {
  const startNode = getStartNode(grid)
  const endNode = getTargetNode(grid)
  const orderedVisistedNodes = dijkstra(grid, startNode, endNode)
  const shortestPathNodes = getShortestPathNodes(endNode)
  animateDijkstra(orderedVisistedNodes, shortestPathNodes)
}

/**
 * Change the class assigned to the nodes visted to allow for the visualization of the dijkstra algorithm
 * @param {Array} orderedVisistedNodes
 * @param {Array} shortestPathNodes
 */
const animateDijkstra = (orderedVisistedNodes, shortestPathNodes) => {
  for (let i = 0; i <= orderedVisistedNodes.length; i++) {
    if (i === orderedVisistedNodes.length) {
      setTimeout(() => {
        animateShortestPath(shortestPathNodes)
      }, 10 * i)
      return
    }
    setTimeout(() => {
      const node = orderedVisistedNodes[i]
      document.getElementById(`node-${node.row}-${node.col}`).className = 'node visited-node'
    }, 10 * i)
  }
}

/**
 * Change the class of the nodes that make up the optimal or shortest path
 * @param {Array} shortestPathNodes 
 */
const animateShortestPath = (shortestPathNodes) => {
  for (let i = 0; i < shortestPathNodes.length; i++) {
    setTimeout(() => {
      const node = shortestPathNodes[i]
      document.getElementById(`node-${node.row}-${node.col}`).className = 'node shortest-path-node'
    }, 50 * i)
  }
}

export {
  animateDijkstra,
  animateShortestPath,
  visualizeDijkstra
}