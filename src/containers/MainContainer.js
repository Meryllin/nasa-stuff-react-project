import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default class MainContainer extends Component {
  render() {
    return (
      <div>
        <Link to="/search">
          <Button buttonText={"Search!"} />
        </Link>
        <Link to="/game">
          <Button buttonText={"Play!"} />
        </Link>
        <Link to="/launches">
          <Button buttonText={"View Launches!"} />
        </Link>
      </div>
    );
  }
}
