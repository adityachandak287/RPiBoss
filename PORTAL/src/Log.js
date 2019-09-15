import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import LogTable from "./LogTable";
import { connect } from "react-redux";
import {
  fetchDataAction,
  fetchLogAction,
  fetchDeviceAction
} from "./_actions/index";
const drawerWidth = 20;
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
    marginLeft: 0
  }
});

class Logs extends Component {
  state = {
    logs: [
      {
        ip: "10.01.02.11",
        timestamp: "201-08-2019",
        message: "Message"
      },
      {
        ip: "10.01.02.11",
        timestamp: "201-08-2019",
        message: "Message"
      },
      {
        ip: "10.01.02.11",
        timestamp: "201-08-2019",
        message: "Message"
      },
      {
        ip: "10.01.02.11",
        timestamp: "201-08-2019",
        message: "Message"
      },
      {
        ip: "10.01.02.11",
        timestamp: "201-08-2019",
        message: "Message"
      },
      {
        ip: "10.01.02.11",
        timestamp: "201-08-2019",
        message: "Message"
      },
      {
        ip: "10.01.02.11",
        timestamp: "201-08-2019",
        message: "Message"
      },
      {
        ip: "10.01.02.11",
        timestamp: "201-08-2019",
        message: "Message"
      },
      {
        ip: "10.01.02.11",
        timestamp: "201-08-2019",
        message: "Message"
      },
      {
        ip: "10.01.02.11",
        timestamp: "201-08-2019",
        message: "Message"
      },
      {
        ip: "10.01.02.11",
        timestamp: "201-08-2019",
        message: "Message"
      },
      {
        ip: "10.01.02.11",
        timestamp: "201-08-2019",
        message: "Message"
      },
      {
        ip: "10.01.02.11",
        timestamp: "201-08-2019",
        message: "Message"
      },
      {
        ip: "10.01.02.11",
        timestamp: "201-08-2019",
        message: "Message"
      },
      {
        ip: "10.01.02.11",
        timestamp: "201-08-2019",
        message: "Message"
      },
      {
        ip: "10.01.02.11",
        timestamp: "201-08-2019",
        message: "Message"
      },
      {
        ip: "10.01.02.11",
        timestamp: "201-08-2019",
        message: "Message"
      },
      {
        ip: "10.01.02.11",
        timestamp: "201-08-2019",
        message: "Message"
      },
      {
        ip: "10.01.02.11",
        timestamp: "201-08-2019",
        message: "Message"
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
          <LogTable logs={this.props.logs} />
        </div>
      </Fragment>
    );
  }
}
const MapStateToProp = state => {
  return {
    logs: state.logs.logList
  };
};
const styledComponent = withStyles(styles, { withTheme: true })(Logs);
export default connect(
  MapStateToProp,
  {
    fetchDataAction,
    fetchLogAction,
    fetchDeviceAction
  }
)(styledComponent);
