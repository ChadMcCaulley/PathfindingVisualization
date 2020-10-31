import { setNodeClass } from './node'

/**
 * Change the class of the nodes that make up the optimal or shortest path
 * @param {Array} shortestPathNodes
 * @param {Boolean} showAnimations
 */
const animateShortestPath = (shortestPathNodes, showAnimations) => {
  shortestPathNodes.forEach((node, i) => {
    if (showAnimations) setTimeout(() => setNodeClass(node, 'optimal-path-node'), 50 * i)
    else setNodeClass(node, 'optimal-path-node-no-ani')
  })
}

export {
  animateShortestPath
}