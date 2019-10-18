import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import AppBar from "./AppBar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class DbView extends Component {
  render() {
    return (
      <div>
        <Grid item xs={12}>
          <AppBar heading="Settings" />
        </Grid>
        <Grid item xs={12}>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              style={{ margin: 20 }}
            >
              Admin Module
            </Button>
          </Link>
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
          <Link to="/settings" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              style={{ margin: 20 }}
            >
              Settings
            </Button>
          </Link>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {/* <Devices /> */}
          </Grid>
          <Grid item xs={4}>
            {/* <DeviceChart /> */}
          </Grid>

          <Grid item xs={4}>
            {/* <Log />
          </Grid> */}
            <Grid item xs={6}>
              {/* <Terminal /> */}
            </Grid>
            {/* <Grid item xs={4}>
              <LogChart /> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect()(DbView);
