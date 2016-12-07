import React, { Component } from 'react';
import Panel from './Panel';
import ReactBootstrapSlider from 'react-bootstrap-slider';

class Slider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentValue: 0,
      max: 100000,
      min: 0,
      step: 1,
    }
    this.changeFollowers = this.changeFollowers.bind(this)
  }

  changeFollowers(e) {
    this.minFollowers = e.target.value;
  }

  render() {
    return (
      <Panel title="Step 3:">
        <div className="Slider">
          <h2>Finally, Lets Weed Out the Egg Avatars & Specify a Minimum Number of Followers: </h2>
          <div className="followers-slider">
          <ReactBootstrapSlider
            className="followers-slider"
            value={this.state.currentValue}
            change={this.changeFollowers}
            step={this.state.step}
            max={this.state.max}
            min={this.state.min}
            orientation="vertical"
           />
          </div>
        </div>
      </Panel>
    )
  }
}


export default Slider;
