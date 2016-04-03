import React                      from "react";
import Dropdown                   from "../../commons/dropdown/Dropdown";
import BtnInfo                    from "../../commons/BtnInfo";

export default class CtrlSelect extends React.Component {

  render() {
    return (
      <div className="clearfix">
        <div className="form-horizontal">
          <div className="form-group">
            <div className="col-xs-offset-2 col-xs-10">
              <h4>{this.props.title}</h4>
              <div className="btn-toolbar">
                <Dropdown
                  list={this.props.list}
                  label={this.props.title}
                  onSelect={this.props.onSelect}
                  value={this.props.value}/>
                <BtnInfo
                  label="Modifier"
                  disabled={!this.props.id}
                  onClick={(e) => {this.props.onModify();} }
                />
                <BtnInfo 
                  label="Nouveau"
                  onClick={(e) => {this.props.onNew();} }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}