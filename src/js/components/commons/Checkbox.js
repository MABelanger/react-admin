import React                      from "react";
import CheckboxCommon             from "./CheckboxCommon";

export default class Checkbox extends React.Component {
  render() {
    var wrapperClass = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + 'has-error';
    }
    return (
      <div className="form-horizontal">
        <div className={wrapperClass}>
          <label htmlFor={this.props.name} className="control-label col-xs-2">
            <br />
            {this.props.label} :
          </label>
          <div className="col-sm-3">
            &nbsp;
            <div className="input">{this.props.error}</div>
              <CheckboxCommon
                {...this.props}
              />
          </div>
        </div>
      </div>
    );
  }
}