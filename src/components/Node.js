import PropTypes from "prop-types";
import { FaRecordVinyl, FaStreetView } from "react-icons/fa";
import { getNodeId, getNodeClassName } from "../utils/node";

export default function Node(props) {
  const {
    id,
    size,
    col,
    row,
    targetNum,
    isStart,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    onDrop,
    onDragEnter,
  } = props;

  const nodeType = isStart ? "start" : targetNum !== null ? "target" : "node";
  const nodeValue = isStart ? isStart : targetNum;

  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      id={id}
      className={getNodeClassName({ isStart, isWall, targetNum })}
      draggable={isStart || targetNum !== null}
      onDragStart={(e) => {
        e.dataTransfer.setData(
          "text/plain",
          `${getNodeId({ col, row })} ${nodeType} ${nodeValue}`,
        );
        e.node = { id: getNodeId({ col, row }), type: nodeType, targetNum };
      }}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={onDragEnter}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={onMouseUp}
    >
      {isStart && <FaStreetView className="node-icon" />}
      {targetNum !== null && !isStart && (
        <FaRecordVinyl className="node-icon" />
      )}
    </div>
  );
}

Node.propTypes = {
  id: PropTypes.string.isRequired,
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  targetNum: PropTypes.number,
  isStart: PropTypes.bool.isRequired,
  isWall: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragEnter: PropTypes.func.isRequired,
};
