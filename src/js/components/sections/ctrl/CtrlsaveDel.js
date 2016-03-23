import React                      from "react";
import BtnInfo                    from "../../commons/BtnInfo";
import BtnDanger                  from "../../commons/BtnDanger";

export default class CtrlSaveDel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-offset-2 col-xs-10">
            <div className="btn-toolbar">
              <BtnInfo
                onClick={ (e)=>{ this.props.onSave(e); } }
                label="Sauvegarder"
              />
              <BtnDanger
                onClick={ (e)=>{ this.props.onDelete(e); } }
                label="X"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
