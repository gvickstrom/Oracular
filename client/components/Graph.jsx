import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import Filter from './Filter';
import moment from 'moment';
import Chart from 'chart.js'
import LineChart from 'react-chartjs';



class Graph extends Component {
  constructor(props) {
    super(props)

    this.state= {
      title: 'Bull',
    }
}

componentDidMount() {
  var ctx = this.refs.myChart;
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["11/30/2016", "12/1/2016", "12/2/2016", "12/3/2016", "12/4/2016", "12/5/2016"],
        datasets: [
          { label: 'Sentiment',
            yAxisID: 'y-axis-1',
            backgroundColor: 'rgba(0, 131, 248, 0.3)',
            borderColor: 'rgba(202, 34, 0, 0.3)',
            data: [0.55, 0.53, 0.59, 0.80, 0.43, 0.49]
          },
          { label: 'Share Price',
            yAxisID: 'y-axis-2',
            backgroundColor: 'rgba(28, 194, 49, 0.3)',
            borderColor: 'rgba(0, 0, 0, 0.3)',
            data: [50, 51.2, 51.6, 50.79, 50.32, 51.11]
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
          <canvas ref="myChart" id="myChart" width="100%" height="100%"></canvas>
        </div>
      </div>
    )
  }
}

export default Graph;
