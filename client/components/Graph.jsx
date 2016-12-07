import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import Filter from './Filter';
const moment = require('moment');



class Graph extends Component {
  constructor(props) {
    super(props)

    this.state= {
      value : ''
    }

    data : {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets = [{
        data: [1, 2, 3, 4, 5, 6, 7]
    }]
  }
}

  render() {
    return (
      <div className="App">
        <h1>Graph Page</h1>
      </div>
    )
  }
}

export default Graph;
