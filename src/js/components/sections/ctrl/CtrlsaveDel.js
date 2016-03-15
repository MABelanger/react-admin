import React                      from "react";
import BtnInfo                    from "../../commons/BtnInfo";
import BtnDanger                    from "../../commons/BtnDanger";

export default class CtrlSaveDel extends React.Component {


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-offset-2 col-xs-10">
            <div className="btn-toolbar">
              <BtnInfo label="Sauvegarder" onClick={this.props.save} />
              <BtnDanger label="X" onClick={this.props.delete} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
