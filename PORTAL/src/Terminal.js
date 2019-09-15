import React, { Component } from "react";
import ReactTerminal from "react-terminal-component";

class Terminal extends Component {
  render() {
    return (
      <div style={{ height: 200 }}>
        <ReactTerminal />
      </div>
    );
  }
}

export default Terminal;
