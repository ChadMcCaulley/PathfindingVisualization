import PropTypes from "prop-types";
import Dropdown from "./Dropdown";

export default function Navbar(props) {
  const {
    updatePathfindingAlgo,
    onGenBinaryTreeMaze,
    onResetGrid,
    onTogglePause,
    isPaused,
    disableAlgoButtons,
    toggleAlgoButtons,
    disabled,
  } = props;

  const pathfindingOptions = [
    { text: "Dijkstra", value: "dijkstra" },
    { text: "A*", value: "astar" },
    { text: "Breadth-First Search", value: "bfs" },
    { text: "Depth-First Search", value: "dfs" },
  ];

  const handlePathfindingSubmit = (pathfinderName) => {
    disableAlgoButtons();
    const selectedAlgo = pathfindingOptions.find(
      (obj) => obj.text === pathfinderName,
    );
    if (selectedAlgo) {
      updatePathfindingAlgo(selectedAlgo.value);
    }
  };

  return (
    <div className="navbar">
      <Dropdown
        label="Pathfinder"
        options={pathfindingOptions}
        btnText="Visualize"
        submitHandler={handlePathfindingSubmit}
        disabled={disabled}
      />
      <button className="btn" onClick={onGenBinaryTreeMaze} disabled={disabled}>
        Binary Tree Maze
      </button>
      <button className="btn" onClick={onTogglePause} disabled={disabled}>
        {isPaused ? "Play" : "Pause"}
      </button>
      <button className="btn" onClick={onResetGrid} disabled={disabled}>
        Reset
      </button>
    </div>
  );
}

Navbar.propTypes = {
  updatePathfindingAlgo: PropTypes.func.isRequired,
  onGenBinaryTreeMaze: PropTypes.func.isRequired,
  onResetGrid: PropTypes.func.isRequired,
  onTogglePause: PropTypes.func.isRequired,
  isPaused: PropTypes.bool.isRequired,
  disableAlgoButtons: PropTypes.func,
  toggleAlgoButtons: PropTypes.func,
  disabled: PropTypes.bool,
};
