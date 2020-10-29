import React, {Component} from 'react'
import Navbar from './components/Navbar'
import Grid from './components/Grid'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pathfindingAlgo: null
    }
    this.gridRef = React.createRef()
  }

  setPathfindingAlgo (value) {
    this.setState({ pathfindingAlgo: value })
  }

  render () {
    const { gridRef } = this
    const { pathfindingAlgo } = this.state
    return (
      <>
        <Navbar
          updatePathfindingAlgo={(value) => this.setPathfindingAlgo(value)}
          onResetGrid={() => gridRef.current.resetGrid(true)}
          onGenBinaryTreeMaze={() => gridRef.current.generateMaze('binary')}
        />
        <Grid
          ref={gridRef}
          pathfindingAlgo={pathfindingAlgo}
          updatePathfindingAlgo={(value) => this.setPathfindingAlgo(value)}
        />
      </>
    )
  }
}
