import { getTargetNode, getStartNode, getNeighbors } from "../../utils/node";
import {
  animateShortestPath,
  getShortestPathNodes,
  animateAlgorithm,
} from "../../utils/algo";

/**
 * The Breadth-First Search algorithm
 * @param {2DArray} grid
 */
const bfs = (grid) => {
  const orderedVisitedNodes = [];
  const startNode = getStartNode(grid);
  const endNode = getTargetNode(grid);

  grid.forEach((row) => {
    row.forEach((node) => {
      node.isVisited = false;
      node.previousNode = null;
    });
  });

  const queue = [startNode];
  startNode.isVisited = true;

  while (queue.length > 0) {
    const currentNode = queue.shift();
    orderedVisitedNodes.push(currentNode);

    if (currentNode === endNode) return orderedVisitedNodes;

    const neighbors = getNeighbors(grid, currentNode);

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      if (!neighbor.isVisited) {
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    }
  }

  return orderedVisitedNodes;
};

/**
 * Visualize the BFS algorithm
 * @param {2DArray} grid
 * @param {Boolean} showAnimations
 * @param {Function} onFinish
 * @param {Function} checkIsPaused
 */
const visualizeBFS = (grid, showAnimations, onFinish, checkIsPaused) => {
  const endNode = getTargetNode(grid);
  const orderedVisitedNodes = bfs(grid);
  const shortestPathNodes = getShortestPathNodes(endNode);

  animateAlgorithm(
    orderedVisitedNodes,
    shortestPathNodes,
    showAnimations,
    animateShortestPath,
    onFinish,
    checkIsPaused,
  );
};

export { bfs, visualizeBFS };
