import React from "react";

class BarList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="bar-list-container">
        {this.props.bars.map(e => (
          <div class="bar-list-item" key={e.id}>
            <div class="bar-list-name">{e.name}</div>
            <div class="bar-list-address">{e.address[0]}</div>
            <div>
              <input type="checkbox" /> Been There
              <input type="checkbox" /> Ignore
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default BarList;
