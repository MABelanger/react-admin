import React                      from "react";

export default class BtnInfo extends React.Component {
  render() {
    return (
      <button className="btn btn-info" onClick={this.props.onClick}> {this.props.label} </button>
    );
  }
}