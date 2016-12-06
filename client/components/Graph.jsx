import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import Filter from './Filter';

class Graph extends Component {
  constructor(props) {
    super(props)

    this.state= {
      value : ''
    }
  }

  render() {
    return(
      <div className="App">
        <div className="App-body">
          <h1>Graph Page</h1>
          <h3>Graph will go here</h3>
        </div>
      </div>
    )
  }
}

export default Graph;
