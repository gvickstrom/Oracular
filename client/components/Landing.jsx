import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { ReactBootstrapSlider } from 'react-bootstrap-slider';
import $ from 'jquery';
import Ticker from './Ticker';
import Filter from './Filter';
import Panel from './Panel';
import Slider from './Slider';
import Graph from './Graph';

class Landing extends Component {
  constructor() {
    super()

    this.state = {
      currentValue: 0,
      twitterData: []
    };
    this.handleClick = this.handleClick.bind(this)
  }
  onBtnClick(event) {
    const offset = $('#top-of-two').offset().top;
    $('html, body').animate({
      scrollTop: offset
    }, 1000);
  }

  handleClick(e) {
    const offset = $('.graphical-rep').offset().top;
    $('html, body').animate({
      scrollTop: offset
    }, 1000);
    return fetch(`/Filter/$${localStorage.getItem('ticker')}?startDate=${localStorage.getItem('startDate')}&endDate=${localStorage.getItem('endDate')}`)
    .then(res => res.json())
    .then(json => {
      this.setState({ twitterData : json.statuses })
    })
  }


  render() {
    return (
      <div className="App">
        <img className="hero-img"src={require('../images/CanaryWharf1.jpg')} />
        <div className="App-body">
          <div className="welcome">
            <h1 className="header-text">Welcome to Oracular</h1>
            <button
              onClick={event => this.onBtnClick(event)}
              className="btn btn-primary btn-lg"
              id="start-btn"
              >
              Let's Do It!
            </button>
          </div>
          <div>
            <p id="intro-paragraph">Short-term market gyrations are increasingly driven by sentiment.  Oracular gives you a tool to view the relationship between sentiment on Twitter-- a microcosm of the market at large-- to the actual price action of a security. Enjoy!
            </p>
          </div>
          <div className="container-fluid">
            <div className="row" id="top-of-two">
              <div className="col-xs-3">
                <Ticker />
              </div>
              <div className="col-xs-6">
                <Filter />
              </div>
              <div className="col-xs-3">
                <Slider />
              </div>
            </div>
          </div>
          <div className="row" id="step-four">
            <h1>Step 4:</h1>
          </div>
          <div className="row">
            <button
              onClick={this.handleClick}
              id="get-graph-btn"
              className="btn btn-lg btn-primary"
              >
              Let's Generate a Graph!
            </button>
          </div>
          <div id="graph">
            <Graph />
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
