import { getTargetNode, getStartNode, getNeighbors } from "../../utils/node";
import {
  animateAlgorithm,
  animateShortestPath,
  getShortestPathNodes,
} from "../../utils/algo";

/**
 * Calculate the heuristic value for two nodes given their positions
 */
const calcHeuristic = (nodeA, nodeB) => {
  return Math.abs(nodeA.col - nodeB.col) + Math.abs(nodeA.row - nodeB.row);
};

/**
 * The A* algorithm
 * @param {2DArray} grid
 */
const aStar = (grid) => {
  const orderedVisitedNodes = []; // 2. Added array to track the spread of the algorithm
  const startNode = getStartNode(grid);
  const endNode = getTargetNode(grid);

  // 3. Initialize properties on the ORIGINAL grid to maintain DOM references
  grid.forEach((row) => {
    row.forEach((node) => {
      node.f = 0;
      node.g = 0;
      node.h = 0;
      node.previousNode = null;
    });
  });

  const openList = [startNode];
  const closedList = [];

  while (openList.length > 0) {
    let lowIndex = 0;
    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[lowIndex].f) lowIndex = i;
    }
    const currentNode = openList[lowIndex];

    // Mark current node as visited for visualization tracking
    orderedVisitedNodes.push(currentNode);

    if (currentNode === endNode) {
      return orderedVisitedNodes; // Return the visited spread, NOT the final path
    }

    openList.splice(lowIndex, 1);
    closedList.push(currentNode);

    const neighbors = getNeighbors(grid, currentNode);

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      if (closedList.includes(neighbor) || neighbor.isWall) continue;

      const gScore = currentNode.g + 1;
      let gScoreIsBest = false;

      if (!openList.includes(neighbor)) {
        gScoreIsBest = true;
        neighbor.h = calcHeuristic(neighbor, endNode);
        openList.push(neighbor);
      } else if (gScore < neighbor.g) {
        gScoreIsBest = true;
      }

      if (gScoreIsBest) {
        // Swapped "parent" to "previousNode" to perfectly match Dijkstra
        neighbor.previousNode = currentNode;
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
      }
    }
  }
  return orderedVisitedNodes;
};

/**
 * Visualize the A* algorithm
 * @param {2DArray} grid
 * @param {Boolean} showAnimations
 * @param {Function} onFinish
 * @param {Function} checkIsPaused
 */
const visualizeAStar = (grid, showAnimations, onFinish, checkIsPaused) => {
  const endNode = getTargetNode(grid);
  const orderedVisitedNodes = aStar(grid);
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

export { aStar, visualizeAStar, getShortestPathNodes };
