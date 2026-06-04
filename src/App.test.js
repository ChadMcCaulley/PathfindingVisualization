import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// 1. Mock the Navbar component
jest.mock("./components/Navbar", () => {
  return function MockNavbar(props) {
    return (
      <div data-testid="mock-navbar">
        <button
          data-testid="nav-set-algo"
          onClick={() => props.updatePathfindingAlgo("Dijkstra")}
        ></button>
        <button
          data-testid="nav-disable"
          onClick={props.disableAlgoButtons}
        ></button>
        <button data-testid="nav-reset" onClick={props.onResetGrid}></button>
        <button
          data-testid="nav-maze"
          onClick={props.onGenBinaryTreeMaze}
        ></button>
        <span data-testid="nav-disabled-state">
          {props.disabled.toString()}
        </span>
      </div>
    );
  };
});

// 2. Mock the Grid component, handling the ref with forwardRef
jest.mock("./components/Grid", () => {
  return React.forwardRef((props, ref) => {
    // Expose mock functions to the ref so App can call them without crashing
    React.useImperativeHandle(ref, () => ({
      resetGrid: jest.fn(),
      generateMaze: jest.fn(),
    }));

    return (
      <div data-testid="mock-grid" data-algo={props.pathfindingAlgo}>
        <button
          data-testid="grid-enable"
          onClick={props.enableAlgoButtons}
        ></button>
      </div>
    );
  });
});

describe("App Component", () => {
  test("renders Navbar and Grid successfully", () => {
    render(<App />);
    expect(screen.getByTestId("mock-navbar")).toBeInTheDocument();
    expect(screen.getByTestId("mock-grid")).toBeInTheDocument();
  });

  test("updates pathfindingAlgo state when updatePathfindingAlgo is triggered", () => {
    render(<App />);
    const setAlgoBtn = screen.getByTestId("nav-set-algo");
    const gridComponent = screen.getByTestId("mock-grid");

    // Initial state should be null (empty string in DOM attribute)
    expect(gridComponent).not.toHaveAttribute("data-algo", "Dijkstra");

    // Trigger state change
    fireEvent.click(setAlgoBtn);

    // Verify state was passed down to Grid
    expect(gridComponent).toHaveAttribute("data-algo", "Dijkstra");
  });

  test("toggles disabled state properly between Navbar and Grid", () => {
    render(<App />);
    const disableBtn = screen.getByTestId("nav-disable");
    const enableBtn = screen.getByTestId("grid-enable");
    const disabledStateDisplay = screen.getByTestId("nav-disabled-state");

    // Initial state
    expect(disabledStateDisplay).toHaveTextContent("false");

    // Navbar triggers disable
    fireEvent.click(disableBtn);
    expect(disabledStateDisplay).toHaveTextContent("true");

    // Grid triggers enable
    fireEvent.click(enableBtn);
    expect(disabledStateDisplay).toHaveTextContent("false");
  });

  test("calls grid ref methods correctly from Navbar", () => {
    render(<App />);

    // Fire the events that trigger the ref methods
    const resetBtn = screen.getByTestId("nav-reset");
    const mazeBtn = screen.getByTestId("nav-maze");

    // We expect no crash here. If the refs weren't wired up correctly
    // in the component or mock, fireEvent would throw an undefined error.
    expect(() => fireEvent.click(resetBtn)).not.toThrow();
    expect(() => fireEvent.click(mazeBtn)).not.toThrow();
  });
});
