import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Node from './Node'

export default class Grid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nodes: []
    }
  }

  componentDidMount() {
    const nodes = new Array(this.props.height).fill(0).map(() => new Array(this.props.length).fill(0))
    this.setState({nodes})
  }

  render() {
    const {nodes} = this.state

    return (
      <div className="grid">
        {nodes.map((row, rowId) => {
          return (
            <div key={rowId}>
              {row.map((node, nodeId) => <Node key={nodeId} /> )}
            </div>
          )
        })}
      </div>
    )
  }
}

Grid.propTypes = {
  length: PropTypes.number,
  height: PropTypes.number
}

Grid.defaultProps = {
  length: 30,
  height: 15
}