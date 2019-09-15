import React, { Fragment, Component } from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Chart from "react-apexcharts";
import { connect } from "react-redux";
import { fetchDeviceAction } from "./_actions/index";
const styles = theme => ({
  root: {
    display: "flex",
    padding: theme.spacing(2.5, 4.7),
    height: 227,
    marginLeft: 35
  },
  division: {
    margin: 10
  }
});

class NumDevices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ["Connected", "Disconnected"],
        theme: {
          monochrome: {
            enabled: true
          }
        },
        title: {
          text: "Number of Devices",
          style: {
            fontSize: "24px",
            fontFamily: undefined,
            color: "black"
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 190
              },
              legend: {
                position: "top"
              }
            }
          }
        ],
        fill: {
          colors: ["#29a32b", "#e81010"]
        }
      }
    };
  }

  componentDidMount = () => {
    this.props.fetchDeviceAction("getDevices", "updateDevices");
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
                series={[this.props.active, this.props.inactive]}
                type="pie"
                width="380"
                height="250"
              />
            </div>
          </Paper>
        </div>
      </Fragment>
    );
  }
}

const MapStateToProp = state => {
  return {
    devices: state.devices.deviceList,
    active: state.devices.active,
    inactive: state.devices.inactive
  };
};
const styledComponent = withStyles(styles, { withTheme: true })(NumDevices);
export default connect(
  MapStateToProp,
  { fetchDeviceAction }
)(styledComponent);
