import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import { Router, Route, Link, browserHistory } from 'react-router';

class Landing extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-body">
          <div className="layer">
            <div>
              <h1 className="welcome">Welcome to Oracular</h1>
            </div>
            <div>
              <p id="intro-paragraph">Short-term market movements are driven by sentiment.  Oracular allows users to determine the relationship between sentiment on twitter-- a microcosm of the market at large-- to the actual price movement of a given security. Enjoy!
              </p>
            </div>
            <div>
              <Link to="/Ticker"><Button id="get-started-btn" bsStyle="primary" bsSize="large" active>Get Started</Button></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
