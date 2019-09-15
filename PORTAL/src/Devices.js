import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import DeviceTable from "./DeviceTable";
import { connect } from "react-redux";
import {
  fetchDeviceAction,
  fetchDataAction,
  fetchLogAction
} from "./_actions/index";
const drawerWidth = 0;
const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    padding: theme.spacing(2),
    marginLeft: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  table: {
    margin: 20
  }
});

class Devices extends Component {
  state = {
    devices: [
      {
        ip: "10.01.02.11",
        date: "201-08-2019",
        status: "true",
        sub: "123.123.250"
      },
      {
        ip: "10.01.02.11",
        date: "201-08-2019",
        status: "true",
        sub: "123.123.250"
      },
      {
        ip: "10.01.02.11",
        date: "201-08-2019",
        status: "true",
        sub: "123.123.250"
      },
      {
        ip: "10.01.02.11",
        date: "201-08-2019",
        status: "true",
        sub: "123.123.250"
      },
      {
        ip: "10.01.02.11",
        date: "201-08-2019",
        status: "true",
        sub: "123.123.250"
      },
      {
        ip: "10.01.02.11",
        date: "201-08-2019",
        status: "true",
        sub: "123.123.251"
      },
      {
        ip: "10.01.02.11",
        date: "201-08-2019",
        status: "true",
        sub: "123.123.251"
      },
      {
        ip: "10.01.02.11",
        date: "201-08-2019",
        status: "true",
        sub: "123.123.251"
      },
      {
        ip: "10.01.02.11",
        date: "201-08-2019",
        status: "true",
        sub: "123.123.251"
      },
      {
        ip: "10.01.02.11",
        date: "201-08-2019",
        status: "true",
        sub: "123.123.251"
      },
      {
        ip: "10.01.02.11",
        date: "201-08-2019",
        status: "true",
        sub: "123.123.251"
      }
    ]
  };
  componentDidMount = () => {
    //Update projects from the redux store
    this.props.fetchDeviceAction("getDevices", "updateDevices");
    //this.props.fetchDataAction("newReading");
    this.props.fetchLogAction("getLogs", "updateLogs");
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.table}>
          <DeviceTable devices={this.props.devices} />
        </div>
      </Fragment>
    );
  }
}

const styledComp = withStyles(styles, { withTheme: true })(Devices);
const MapStateToProp = state => {
  return {
    devices: state.devices.deviceList
  };
};
export default connect(
  MapStateToProp,
  { fetchDeviceAction, fetchDataAction, fetchLogAction }
)(styledComp);
