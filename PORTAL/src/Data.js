import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import DataTable from "./DataTable";
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

class Data extends Component {
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
          <DataTable data={this.props.data} />
        </div>
      </Fragment>
    );
  }
}
const MapStateToProp = state => {
  return {
    data: state.data.dataList
  };
};
const styledComponent = withStyles(styles, { withTheme: true })(Data);
export default connect(
  MapStateToProp,
  {
    fetchDataAction,
    fetchLogAction,
    fetchDeviceAction
  }
)(styledComponent);
