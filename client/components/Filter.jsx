import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { DateRange } from 'react-date-range';
import Ticker from './Ticker';
import moment from 'moment';
import Panel from './Panel';

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
      twitterData: []
    };
    this.handleSelect = this.handleSelect.bind(this)
  }

//code to capture the date range to get the twitter data

  handleSelect(range) {
    let startDate = moment(range.startDate._d).format('YYYY-MM-DD')
    let endDate = moment(range.endDate._d).format('YYYY-MM-DD')
    localStorage.setItem('startDate', startDate)
    localStorage.setItem('endDate', endDate)
    this.startDate = startDate;
    this.endDate = endDate;
  }

  // handleClick(e) {
  //   return fetch(`/Filter/$${localStorage.getItem('ticker')}?minFollowers=${this.minFollowers}&startDate=${this.startDate}&endDate=${this.endDate}`)
  //   .then(res => res.json())
  //   .then(json => {
  //     this.setState({ twitterData : json.statuses })
  //   })
  //   .then(browserHistory.push('/Graph'))
  // }

  render() {
    return (
      <Panel title="Step 2:">
        <div className="Filter">
          <div className="Filter-body">
            <h2>Then, Choose a Date Range: </h2>
              <div>
                <DateRange
                  onChange={this.handleSelect}
                  minDate={this.state.minDate} />
              </div>
          </div>
        </div>
      </Panel>
    )
  }
}

export default Filter;
