import { testAction } from "../src/_actions/index";
import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import Terminal from "terminal-in-react";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
const testURL = "https://jsonplaceholder.typicode.com/todos/1";
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
    marginLeft: 20
  }
});

class Wrapper extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.table}>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "64vh"
            }}
          >
            <Terminal
              color="green"
              backgroundColor="black"
              barColor="black"
              style={{
                fontWeight: "bold",
                fontSize: "1em",
                height: "15em"
              }}
              commandPassThrough={(cmd, print) => {
                axios.get(`${testURL}`).then(response => {
                  console.log(response.data);
                  print(response.data.title);
                });
              }}
              closedTitle="You closed the prompt."
              closedMessage="Click to reopen."
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

const styledComp = withStyles(styles, { withTheme: true })(Wrapper);

const MapStateToProp = state => {
  return {
    result: state.result.testResult
  };
};
export default connect(
  MapStateToProp,
  { testAction }
)(styledComp);
