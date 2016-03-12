import React from "react";

import Footer from "./Footer";
import Header from "./Header";

import 'bootstrap/dist/css/bootstrap.css';

require('../../sass/HelloForm.scss');


export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    alert('toto bibi')
    return (
      <div>
        <div className="hello-form">
          <p>
            toto 3
          </p>
        </div>

        <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} />
        <Footer />
      </div>
    );
  }
}
