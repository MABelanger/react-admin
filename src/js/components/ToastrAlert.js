import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min.js';
//var ReactToastr = require("react-toastr");
import animateCss                 from "animate.css";
import React                      from "react";

import {
  ToastContainer,
  ToastMessage,
} from "react-toastr";


const ToastMessageFactory = React.createFactory(ToastMessage.animation);

export default class ToastrAlert extends React.Component {
  addAlert() {
    this.refs.container.error("hello", `Attention`, {
      closeButton: true,
    });
  }

  clearAlert() {
    this.refs.container.clear();
  }

  render() {
    return (
      <div id="react-root">
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="container"
          className="toast-top-right"
        />

        <div className="btn-container">
          <button className="primary" onClick={::this.addAlert}>
            Hello
          </button>
          <button className="primary" onClick={::this.clearAlert}>
            CLEAR
          </button>
        </div>
      </div>
    );
  }
}