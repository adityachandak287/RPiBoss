import React, { Fragment, Component } from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Chart from "react-apexcharts";
import { connect } from "react-redux";
import { fetchDataAction } from "./_actions";
const styles = theme => ({
  root: {},
  division: {
    margin: 20
  }
});

class NumDevices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          zoom: {
            enabled: false
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.6,
            opacityTo: 0.2
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Fundamental Analysis of Forest Fire",
          align: "left"
        },
        legend: {
          horizontalAlign: "left"
        },
        //Line Color
        colors: ["#008FFB", "#5be360", "#fc9403", "#e81010"],
        xaxis: {
          labels: {
            show: false
          }
        },
        yaxis: {
          text: "Magnitude"
        }
      },
      series: [
        {
          name: "Area Under Fire",
          data: [11, 75, 36, 44, 50]
        },
        {
          name: "Small Fire",
          data: [5, 5, 5, 5, 5]
        },
        {
          name: "Medium Fire",
          data: [25, 25, 25, 25, 25]
        },
        {
          name: "Large Fire",
          data: [100, 100, 100, 100, 100]
        }
      ]
    };
  }
  componentDidMount = () => {
    this.props.fetchDataAction("newReading");
  };
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.division}>
          <Paper className={classes.root}>
            <div>
              <Chart
                options={this.state.options}
                series={[
                  {
                    name: "Area Under Fire",
                    data: this.props.predictionList
                  },
                  {
                    name: "Small Fire",
                    data: this.props.smallList
                  },
                  {
                    name: "Medium Fire",
                    data: this.props.mediumList
                  },
                  {
                    name: "Large Fire",
                    data: this.props.largeList
                  }
                ]}
                type="area"
                height="250"
              />
            </div>
          </Paper>
        </div>
      </Fragment>
    );
  }
}
const styledComponent = withStyles(styles, { withTheme: true })(NumDevices);
const MapStateToProp = state => {
  const listLen = state.data.listLen < 5 ? 5 : state.data.listLen;
  return {
    predictionList: state.data.predictionList,
    smallList: Array(listLen).fill(50),
    mediumList: Array(listLen).fill(100),
    largeList: Array(listLen).fill(200)
  };
};
export default connect(
  MapStateToProp,
  { fetchDataAction }
)(styledComponent);
