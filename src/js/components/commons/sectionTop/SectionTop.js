import React                      from "react";
import Dropdown                   from "./dropdown/Dropdown";
import BtnInfo                    from "../BtnInfo";

export default class SectionTop extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-offset-2 col-xs-10">
          <div className="btn-toolbar">
            <Dropdown list={this.props.list} />
            <BtnInfo label="Modifier" />
            <BtnInfo label="Nouveau" />
          </div>
        </div>
      </div>
    );
  }
}