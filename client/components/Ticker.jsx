import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import { Navbar, Jumbotron, Button, FormGroup, FormControl, Col, InputGroup, Input } from 'react-bootstrap';
import { Combobox } from 'react-input-enhancements';
import fetch from 'isomorphic-fetch';
import Panel from './Panel';


class Ticker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      tickerData : [],
    };

  }

  componentDidMount() {
    return fetch('/Ticker')
    .then(res => res.json())
    .then(json => {
      this.setState({tickerData : json})
    })
}

  onChange(text) {
    this.setState({ value: text });
    localStorage.setItem('ticker', text)
  }

  render() {
    return (
      <Panel title="Step 1:">
        <FormGroup>
          <div className="Ticker container-fluid">
            <div className="Ticker-body">
              <h3>First, Please Select a U.S. Listed Stock: </h3>
                <Combobox
                  defaultValue={this.state.value}
                  options={this.state.tickerData}
                  onSelect={e => this.onChange(e)}
                  autosize
                  autocomplete>
                  {(inputProps, otherProps, registerInput) =>
                    <FormControl
                      id="tickerbox"
                      {...inputProps}
                      ref={c => registerInput(ReactDOM.findDOMNode(c))}
                      type='text'
                      placeholder='Select a Company'
                    />
                  }
                </Combobox>
            </div>
          </div>
        </FormGroup>
      </Panel>
    )
  }
}

export default Ticker;
