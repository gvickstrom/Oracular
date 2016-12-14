import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import Filter from './Filter';
import moment from 'moment';
import Chart from 'chart.js'
import LineChart from 'react-chartjs';



class Graph extends Component {
  constructor(props) {
    super(props)

    this.getDataClick = this.getDataClick.bind(this)

    this.state= {
      title: '',
      prices:[],
      scores: []
    }
}

getDataClick() {
  return fetch(`/Filter/$${localStorage.getItem('ticker')}?startDate=${localStorage.getItem('startDate')}&endDate=${localStorage.getItem('endDate')}`)
  .then(res => res.json())
  .then(json => {
    console.log(json);
    this.setState({
      prices : json.eodPrices,
      scores : json.scores
    })
  }).catch(console.log)
}

componentDidMount() {
  var ctx = this.refs.myChart;
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['12/6/2016', '12/7/2016', '12/8/2016', '12/9/2016'],
        datasets: [
          { label: 'Sentiment',
            yAxisID: 'y-axis-1',
            backgroundColor: 'rgba(0, 131, 248, 0.3)',
            borderColor: 'rgba(202, 34, 0, 0.3)',
            data: this.state.scores
          },
          { label: 'Share Price',
            yAxisID: 'y-axis-2',
            backgroundColor: 'rgba(28, 194, 49, 0.3)',
            borderColor: 'rgba(0, 0, 0, 0.3)',
            data: this.state.prices
          }
        ]},
      options: {
        drawOnChartArea : true,
          scales: {
              yAxes: [{
                  type: "linear",
                  position: "left",
                  id: "y-axis-1"
                },
                {
                  type: "linear",
                  position: "left",
                  id: "y-axis-2"
                },
                {
                  ticks: {
                    beginAtZero: false
                  },
                  stacked: true
                }]
                }
              }
            });
          }


componentWillUpdate() {
  var unfilteredScores = this.state.scores;
  var filteredScores = unfilteredScores.map(subArr => {
    return subArr.filter(num => {
      if (num !== null) {
       return true;
     }
    })
  })
  var finalScores = filteredScores.map(el => {
    return el.reduce((a, b) => {
      return parseFloat(a) + parseFloat(b); }, 0) / el.length
  })

    console.log("final scores", finalScores);

  var ctx = this.refs.myChart;
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['12/6/2016', '12/7/2016', '12/8/2016', '12/9/2016'],
        datasets: [
          { label: 'Sentiment',
            yAxisID: 'y-axis-1',
            backgroundColor: 'rgba(0, 131, 248, 0.3)',
            borderColor: 'rgba(202, 34, 0, 0.3)',
            data: finalScores
          },
          { label: 'Share Price',
            yAxisID: 'y-axis-2',
            backgroundColor: 'rgba(28, 194, 49, 0.3)',
            borderColor: 'rgba(0, 0, 0, 0.3)',
            data: this.state.prices
          }
        ]},
      options: {
        drawOnChartArea : true,
          scales: {
              yAxes: [{
                  type: "linear",
                  position: "left",
                  id: "y-axis-1"
                },
                {
                  type: "linear",
                  position: "left",
                  id: "y-axis-2"
                },
                {
                  ticks: {
                    beginAtZero: false
                  },
                  stacked: true
                }]
                }
              }
            });
          }

  render() {
    return (
      <div className="Graph">
        <div className="graphical-rep">
          <button className="btn btn-success" id="get-data-btn" onClick={this.getDataClick}>Get Data</button>
          <canvas ref="myChart" id="myChart" width="100%" height="100%"></canvas>
        </div>
      </div>
    )
  }
}

export default Graph;
