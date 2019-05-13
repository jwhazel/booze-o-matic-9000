import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/header";
import Nav from "./components/nav";
import Results from "./components/results";
import Footer from "./components/footer";
import "./main.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      init: { maxResults: 100, version: "1.0.0" },
      data: { name: "", price: "", rating: "", address: [], categories: [] },
      working: true
    };

    this.initData = this.initData.bind(this);
    this.randomData = this.randomData.bind(this);

    this.initData();
  }
  initData() {
    fetch("http://localhost:3000/api/init")
      .then(res => res.json())
      .then(data => {
        this.setState({ init: data.data, working: false });
      });
  }
  randomData() {
    this.setState({ working: true });
    let maxResults = this.state.init.maxResults;

    fetch(`http://localhost:3000/api/random?max=${maxResults}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ data: data.data, working: false });
      });
  }
  render() {
    return (
      <main>
        <Header />
        <Nav buttonState={this.state.working} clickFunction={this.randomData} />
        <section
          className="data-container"
          className={this.state.data.name ? "dice-rolled" : ""}
        >
          <div className="col1" />
          <div
            className="col2"
            style={{
              backgroundImage: `url(${this.state.data.image_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <Results data={this.state.data} />
          </div>
        </section>
        <Footer data={this.state.init} />
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
