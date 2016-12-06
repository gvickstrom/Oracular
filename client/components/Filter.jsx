import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import { DateRange } from 'react-date-range';
import Ticker from './Ticker';
const moment = require('moment');

class Filter extends Component {

  constructor(props) {
    super(props)

    this.state = {
      value: '',
      currentValue: 0,
      max: 100000,
      min: 0,
      step: 1,
      minDate: moment().subtract(7, 'days'),
      dateRange : {},
      followerRange: [],
      twitterData: []
    };
    this.changeKlout = this.changeKlout.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }


//code to capture the date and klout range to get the twitter data

  handleSelect(range) {
    console.log(range);
  }

  changeKlout(e) {
    // console.log(e);
    // this.setState( { kloutRange : e.target.value})
    this.minFollowers = e.target.value;
  }

  handleClick(e) {
    console.log(this.minFollowers);
    return fetch(`/Filter/$${localStorage.getItem('ticker')}?minFollowers=${this.minFollowers}`)
    .then(res => res.json())
    .then(json => {
      this.setState({ twitterData : json.statuses })
      console.log(this.state.twitterData);
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-body">
          <h1>Filter Page</h1>
          <h2>Select a Date Range for {localStorage.getItem('ticker')}</h2>
            <div>
              <DateRange
                onInit={this.handleSelect}
                onChange={this.handleSelect}
                minDate={this.state.minDate} />
            </div>
          <h2>Select Minimum Number of Followers for {localStorage.getItem('ticker')}</h2>
          <div className="followers-slider">
          <ReactBootstrapSlider
            className="followers-slider"
            value={this.state.currentValue}
            change={this.changeKlout}
            step={this.state.step}
            max={this.state.max}
            min={this.state.min}
            orientation="horizontal"
           />
          </div>
          <div>
            <Button onClick={this.handleClick}id="get-graph-btn" bsStyle="primary" bsSize="large" active>Create Graph!</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Filter;
