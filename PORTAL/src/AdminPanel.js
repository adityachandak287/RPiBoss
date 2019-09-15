import React, { Component } from "react";
import Devices from "./Devices";
import { Grid } from "@material-ui/core";
import AppBar from "./AppBar";
import Log from "./Log";
import DeviceChart from "./DeviceChart";
import Terminal from "./Terminal";
import Button from "@material-ui/core/Button";
import LogChart from "./LogChart";
import { Link } from "react-router-dom";
import { fetchDeviceAction, fetchLogAction, fetchDataAction } from "./_actions";
import { connect } from "react-redux";

class AdminPanel extends Component {
  componentDidMount = () => {
    this.props.fetchDeviceAction("getDevices", "updateDevices");
    this.props.fetchDataAction("newReading");
    this.props.fetchLogAction("getLogs", "updateLogs");
  };
  render() {
    return (
      <div>
        <Grid item xs={12}>
          <AppBar heading="Administration Panel" />
        </Grid>
        <Grid item xs={12}>
          <Link to="/ml" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              style={{ margin: 20 }}
            >
              ML Module
            </Button>
          </Link>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Devices />
          </Grid>
          <Grid item xs={4}>
            <DeviceChart />
          </Grid>

          <Grid item xs={4}>
            <Log />
          </Grid>
          <Grid item xs={6}>
            <Terminal />
          </Grid>
          {/* <Grid item xs={4}>
            <LogChart />
          </Grid> */}
        </Grid>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchDataAction, fetchDeviceAction, fetchLogAction }
)(AdminPanel);
