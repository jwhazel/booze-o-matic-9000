import React from "react";
import classNames from "classnames";
import "./nav.css";

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className="nav gradient">
        <button
          id="randomize"
          className={this.props.buttonState ? "working" : ""}
          onClick={this.props.clickFunction}
          disabled={this.props.buttonState}
        >
          {this.props.buttonState ? "thinking..." : "Roll the dice"}
        </button>
      </section>
    );
  }
}

export default Nav;
