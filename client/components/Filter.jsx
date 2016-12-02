import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import { Router, Route, Link, browserHistory } from 'react-router';
import ReactBootstrapSlider from 'react-bootstrap-slider';

class Filter extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-body">
          <h2>Filter Page</h2>
          <h4>Select a Date Range: </h4>
            <ReactBootstrapSlider
              value={this.state.currentValue}
              change={this.changeValue}
              slideStop={this.changeValue}
              step={this.state.step}
              max={this.state.max}
              min={this.state.min}
              orientation="horizontal"
              reverse={true}
              disabled="disabled" />
            <h4>Select a Klout Range: </h4>
            <ReactBootstrapSlider
              value={this.state.currentValue}
              change={this.changeValue}
              slideStop={this.changeValue}
              step={this.state.step}
              max={this.state.max}
              min={this.state.min}
              orientation="horizontal"
              reverse={true}
              disabled="disabled" />
        </div>
      </div>
    )
  }
}

export default Filter;
