import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  constructor(props) {
    super(props);
    this.handleToggleLocked = this.handleToggleLocked.bind(this);
  }

  handleToggleLocked() {
    this.props.toggleLocked(this.props.idx);
  }

  render() {
    return (
      <button
        className={this.props.locked ? "Die Die-locked" : "Die"}
        onClick={this.handleToggleLocked}
      >
        {this.props.val}
      </button>
    );
  }
}

export default Die;
