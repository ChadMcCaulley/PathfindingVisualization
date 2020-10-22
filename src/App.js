import React, {Component} from 'react'
import Navbar from './components/Navbar'
import Grid from './components/Grid'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.gridRef = React.createRef()
  }

  render () {
    const { gridRef } = this
    return (
      <>
        <Navbar
          onVisualizeDijkstra={() => gridRef.current.visualizeAlgo('dijkstra')}
          onVisualizeAStar={() => gridRef.current.visualizeAlgo('astar')}
          onResetGrid={() => { gridRef.current.resetGrid(true)}}
        />
        <Grid ref={gridRef} />
      </>
    )
  }
}
