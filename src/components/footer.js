import React from "react";
import "./footer.css";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className="footer">
        <div>
          Randomized data from {this.props.data.maxResults} bar listings on Yelp.
        </div>
        <div>
          Made with ❤️ by <a href="https://twitter.com/jessewhazel">jesse</a>
        </div>
        <div>
          Version: {this.props.data.version} (
          <a href="https://github.com/jwhazel/bar-o-matic-9000">sourcecode</a>)
        </div>
      </section>
    );
  }
}

export default Footer;
