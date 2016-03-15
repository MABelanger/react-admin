import React                      from "react";

export default class BtnDanger extends React.Component {
  render() {
    return (
      <button className="btn btn-danger"> {this.props.label} </button>
    );
  }
}