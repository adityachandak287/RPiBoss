import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import MLPanel from "./MLPanel";
import { fetchDeviceAction, fetchLogAction, fetchDataAction } from "./_actions";
import { connect } from "react-redux";
class App extends Component {
  componentDidMount = () => {
    this.props.fetchDeviceAction("getDevices", "updateDevices");
    //this.props.fetchDataAction("newReading");
    this.props.fetchLogAction("getLogs", "updateLogs");
  };
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/admin" exact component={AdminPanel} />
          <Route path="/ml" exact component={MLPanel} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { fetchDeviceAction, fetchLogAction, fetchDataAction }
)(App);
