import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/header/header";
import Nav from "./components/nav/nav";
import Results from "./components/results/results";
import Footer from "./components/footer/footer";
import "./main.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      init: { maxResults: null, version: "" },
      location: "Louisville, KY",
      data: {categories:[], address:[]},
      working: true
    };

    this.initData = this.initData.bind(this);
    this.randomData = this.randomData.bind(this);
    this.listData = this.listData.bind(this);

    this.initData();
  }
  initData() {
    fetch(`http://localhost:3000/api/init?location=${this.state.location}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ init: data.data, working: false });
      })
      .catch(err => {
        console.log(err);
      });
  }
  randomData() {
    this.setState({ working: true });
    fetch(
      `http://localhost:3000/api/random?max=${
        this.state.init.maxResults
      }&location=${this.state.location}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ data: data.data, working: false });
      })
      .catch(err => {
        console.log(err);
      });
  }
  listData(){

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
