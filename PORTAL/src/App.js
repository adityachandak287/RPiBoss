import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import MLPanel from "./MLPanel";
import DbView from "./DbView";
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
      <div data-test="AppComponent">
        <BrowserRouter>
          <div>
            <Route path="/admin" exact component={AdminPanel} />
            <Route path="/ml" exact component={MLPanel} />
            <Route path="/settings" exact component={DbView} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchDeviceAction, fetchLogAction, fetchDataAction }
)(App);
