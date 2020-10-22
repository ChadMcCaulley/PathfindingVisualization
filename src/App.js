import React, {Component} from 'react'
import Navbar from './components/Navbar'
import Grid from './components/Grid'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
  }

  render () {
    return (
      <>
        <Navbar
          onVisualizeDijkstra={() => this.gridRef.current.visualizeAlgo('dijkstra')}
          onResetGrid={() => { this.gridRef.current.resetGrid(true)}}
        />
        <Grid ref={this.gridRef}/>
      </>
    )
  }
}
