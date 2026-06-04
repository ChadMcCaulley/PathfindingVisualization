import { getTargetNode, getStartNode, getNeighbors } from "../../utils/node";
import {
  animateAlgorithm,
  animateShortestPath,
  getShortestPathNodes,
} from "../../utils/algo";

/**
 * The Depth-First Search algorithm
 * @param {2DArray} grid
 */
const dfs = (grid) => {
  const orderedVisitedNodes = [];
  const startNode = getStartNode(grid);
  const endNode = getTargetNode(grid);

  // Initialize properties on the ORIGINAL grid to maintain DOM references
  grid.forEach((row) => {
    row.forEach((node) => {
      node.isVisited = false;
      node.previousNode = null;
    });
  });

  // DFS uses a Stack (Last-In, First-Out)
  const stack = [startNode];

  while (stack.length > 0) {
    // Take the last node off the top of the stack
    const currentNode = stack.pop();

    // Because nodes can be added to the stack multiple times before they are visited,
    // we need to skip them if we've already processed them.
    if (currentNode.isVisited) continue;

    currentNode.isVisited = true;
    orderedVisitedNodes.push(currentNode);

    // End case: Target found
    if (currentNode === endNode) {
      return orderedVisitedNodes;
    }

    const neighbors = getNeighbors(grid, currentNode);

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      // If we haven't visited it, push it onto the stack!
      if (!neighbor.isVisited) {
        neighbor.previousNode = currentNode;
        stack.push(neighbor);
      }
    }
  }

  // Return the nodes visited even if no path was found
  return orderedVisitedNodes;
};

/**
 * Visualize the DFS algorithm
 * @param {2DArray} grid
 * @param {Boolean} showAnimations
 * @param {Function} onFinish
 * @param {Function} checkIsPaused
 */
const visualizeDFS = (grid, showAnimations, onFinish, checkIsPaused) => {
  const endNode = getTargetNode(grid);
  const orderedVisitedNodes = dfs(grid);
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

export { dfs, visualizeDFS, getShortestPathNodes };
