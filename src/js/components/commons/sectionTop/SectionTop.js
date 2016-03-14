import React                      from "react";
import Dropdown                   from "./dropdown/Dropdown";
import BtnInfo                    from "../BtnInfo";

export default class SectionTop extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-offset-2 col-xs-10">
        <h4>{this.props.title}</h4>
          <div className="btn-toolbar">
            <Dropdown
              list={this.props.list}
              label={this.props.title}
              currentSelection={this.props.currentSelection} />
            <BtnInfo label="Modifier" />
            <BtnInfo label="Nouveau" />
          </div>
        </div>
      </div>
    );
  }
}