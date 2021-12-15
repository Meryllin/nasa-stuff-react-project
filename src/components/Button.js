import React, { Component } from "react";

export default class Button extends Component {
  render() {
    return (
      <div className="buttoncontainer">
        <button>{this.props.buttonText}</button>
      </div>
    );
  }
}
