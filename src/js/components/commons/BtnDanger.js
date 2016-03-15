import React                      from "react";

export default class BtnDanger extends React.Component {
  render() {
    return (
      <button className="btn btn-danger" onClick={this.props.onClick}> {this.props.label} </button>
    );
  }
}