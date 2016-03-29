import React                      from "react";


export default class CheckboxInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked || false
    };
  }

  handleClick(e) {
    const value = e.target.checked;
    this.props.changeValue(this.props.name, value);
  }


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
              <input type="checkbox"
                name={this.props.name}
                className="form-control"
                checked={this.props.checked}
                ref={this.props.name}
                value={this.props.value} 
                onClick={this.handleClick.bind(this)}
              />
          </div>
        </div>
      </div>
    );
  }
}