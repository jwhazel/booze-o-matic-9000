import React from "react";
import "./results.css";

class Results extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.data);
  }
  render() {
    return (
      <div className="results-container">
        <div id="results-name">{this.props.data.name}</div>
        <div className="price-rating">
          <span id="results-price">{this.props.data.price}</span> ■
          <span id="results-rating">{this.props.data.rating}</span>
        </div>
        <div id="results-address">
          {this.props.data.address.map(e => (
            <div>{e}</div>
          ))}
        </div>
        <div id="results-categories">
          {this.props.data.categories.map(e => (
            <span className="category">{e}</span>
          ))}
        </div>
      </div>
    );
  }
}

export default Results;
