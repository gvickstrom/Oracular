import React, { Component } from 'react';
import { Navbar, Jumbotron, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Router, Route, Link, browserHistory } from 'react-router'

class Ticker extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     selection: '',
  //     company: ''
  //   }
  //   this.tickerSelect = _.debounce(() => {this.fetchTickers(this.state.select)}, 500)
  // }

  //write logic to set state once user selects a ticker as well as auto-complete as they begin to type

  // fetchTickers(select) {
  //   return fetch()
  // }


  render() {
    return (
      <div className="App">
        <h2>Stock Selection Page</h2>
        <div className="App-body">
          <h3>Please Select a Stock...</h3>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select U.S. Ticker</ControlLabel>
            <FormControl componentClass="select" placeholder="Select from Dropdown">
              <option value="select">IBM</option>
              <option value="other">APPL</option>
              <option value="other">NLY</option>
              <option value="other">CIM</option>
              <option value="other">GDX</option>
            </FormControl>
          </FormGroup>
        </div>
      </div>
    )
  }
}

export default Ticker;
