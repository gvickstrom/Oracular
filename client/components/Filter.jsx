import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import { Router, Route, Link, browserHistory } from 'react-router';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import Ticker from './Ticker';

class Filter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: this.props.value,
      currentValue: [0, 100],
      max: 100,
      min: 0
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-body">
          <h1>Filter Page</h1>
          <h2>Select a Date Range for {localStorage.getItem('ticker')}</h2>
          <div className="date-slider">
            <ReactBootstrapSlider
              className="date-slider"
              value={this.state.currentValue}
              change={this.changeValue}
              slideStop={this.changeValue}
              step={this.state.step}
              max={this.state.max}
              min={this.state.min}
              range={true}
              orientation="horizontal"
              reverse={true} />
          </div>
          <h2>Select Klout Score for {localStorage.getItem('ticker')}</h2>
          <div className="date-slider">
          <ReactBootstrapSlider
            className="date-slider"
            value={this.state.currentValue}
            change={this.changeValue}
            slideStop={this.changeValue}
            step={this.state.step}
            max={this.state.max}
            min={this.state.min}
            range={true}
            orientation="horizontal"
            reverse={true} />
          </div>
        </div>
      </div>



    )
  }
}

export default Filter;
