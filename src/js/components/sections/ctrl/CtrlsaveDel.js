import React                      from "react";
import BtnInfo                    from "../../commons/BtnInfo";
import BtnInfo                    from "../../commons/BtnDanger";

export default class CtrlSaveDel extends React.Component {


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-offset-2 col-xs-10">
            <div className="btn-toolbar">
              <BtnInfo label="Sauvegarder" />
              <BtnDanger label="X" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
