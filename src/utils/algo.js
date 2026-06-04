import { setNodeClass } from "./node";

let activeTimeouts = [];

const clearAllTimeouts = () => {
  activeTimeouts.forEach(clearTimeout);
  activeTimeouts = [];
};

const trackTimeout = (callback, delay) => {
  const id = setTimeout(callback, delay);
  activeTimeouts.push(id);
  return id;
};

const getShortestPathNodes = (endNode) => {
  const shortestPathNodes = [];
  let currentNode = endNode;
  while (currentNode !== null && currentNode.previousNode !== undefined) {
    shortestPathNodes.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestPathNodes;
};

const animateAlgorithm = (
  orderedVisitedNodes,
  shortestPathNodes,
  showAnimations,
  animateShortestPath,
  onFinish,
  checkIsPaused,
) => {
  if (!orderedVisitedNodes || !shortestPathNodes) return;

  if (!showAnimations) {
    orderedVisitedNodes.forEach((node) =>
      setNodeClass(node, "visited-node-no-ani"),
    );
    animateShortestPath(shortestPathNodes, false, onFinish, checkIsPaused);
    return;
  }

  let i = 0;
  const animateNextVisitedNode = () => {
    if (checkIsPaused && checkIsPaused()) {
      trackTimeout(animateNextVisitedNode, 50);
      return;
    }

    if (i < orderedVisitedNodes.length) {
      const node = orderedVisitedNodes[i];
      setNodeClass(node, "visited-node");
      i++;
      trackTimeout(animateNextVisitedNode, 10);
    } else {
      animateShortestPath(shortestPathNodes, true, onFinish, checkIsPaused);
    }
  };

  animateNextVisitedNode();
};

const animateShortestPath = (
  shortestPathNodes,
  showAnimations,
  onFinish,
  checkIsPaused,
) => {
  if (!showAnimations) {
    shortestPathNodes.forEach((node) =>
      setNodeClass(node, "shortest-path-no-ani"),
    );
    if (onFinish) onFinish();
    return;
  }

  let i = 0;

  const animateNextPathNode = () => {
    if (checkIsPaused && checkIsPaused()) {
      trackTimeout(animateNextPathNode, 50);
      return;
    }

    if (i < shortestPathNodes.length) {
      const node = shortestPathNodes[i];
      setNodeClass(node, "shortest-path");
      i++;
      trackTimeout(animateNextPathNode, 50);
    } else {
      if (onFinish) onFinish();
    }
  };

  animateNextPathNode();
};

export {
  animateAlgorithm,
  animateShortestPath,
  clearAllTimeouts,
  getShortestPathNodes,
};
