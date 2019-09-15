import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import AppBar from "./AppBar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Data from "./Data";
import DataChart from "./DataChart";
class AdminPanel extends Component {
  componentDidMount = () => {
    //this.props.fetchAllAction("newConnection", "gotData");
  };
  render() {
    return (
      <div>
        <Grid item xs={12}>
          <AppBar heading="Forest Fire Prediction" />
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
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DataChart />
          </Grid>
          <Grid item xs={12}>
            <Data />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default AdminPanel;
