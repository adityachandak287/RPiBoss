import React, { Fragment, Component } from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Chart from "react-apexcharts";

const styles = theme => ({
  root: {
    display: "flex"
  },
  division: {
    margin: 20
  }
});

class LogDevices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        title: {
          text: "Log",
          align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "24px",
            color: "black"
          }
        },
        plotOptions: {
          radialBar: {
            offsetY: -10,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: "5%",
              background: "transparent",
              image: undefined
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                show: false
              }
            }
          }
        },
        colors: ["#1ab7ea", "#0084ff", "#39539E"],
        labels: ["Troubleshoot", "Offline", "Online"],
        legend: {
          show: true,
          floating: true,
          fontSize: "16px",
          position: "left",
          offsetX: 160,
          offsetY: 10,
          labels: {
            useSeriesColors: true
          },
          markers: {
            size: 0
          },
          formatter: function(seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
          },
          itemMargin: {
            horizontal: 1
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                show: false
              }
            }
          }
        ]
      },
      series: [76, 67, 61, 90]
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.division}>
          <Paper className={classes.root}>
            <div>
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="radialBar"
                width="350"
              />
            </div>
          </Paper>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LogDevices);
