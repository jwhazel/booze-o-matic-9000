import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/header/header";
import Nav from "./components/nav/nav";
import BarList from "./components/bar-list/bar-list";
import Results from "./components/results/results";
import Footer from "./components/footer/footer";
import "./main.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barList: [],
      currentBar: {}
    };

    this.getData();
  }
  getData() {
    fetch("http://localhost:3000/api/get-data")
      .then(res => res.json())
      .then(data => {
        this.setState({ barList: data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  setRandom() {
    var setLength = this.state.barList.length;
    var randomIndex = Math.floor(Math.random() * setLength);
    this.setState({ currentBar: this.state.barList[randomIndex] });
  }

  render() {
    return (
      <main>
        <Header />
        <BarList bars={this.state.barList}/>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
