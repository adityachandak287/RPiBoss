import React, { Component, Fragment } from "react";
class TerminalSelf extends Component {
  state = {
    command: ""
  };
  handleChange = e => {
    this.setState({ command: e.target.value });
  };
  handleKeyDown = e => {
    if (e.key === "Enter") console.log("Enter pressed");
  };
  render() {
    return (
      <Fragment>
        <div
          style={{
            border: "3px solid black",
            width: 505,
            height: 35
          }}
        >
          <textarea
            style={{ width: 500 }}
            onChange={this.handleChange}
            value={this.state.command}
            onKeyDown={this.handleKeyDown}
          />
        </div>
      </Fragment>
    );
  }
}

export default TerminalSelf;
