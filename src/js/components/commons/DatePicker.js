import React                      from "react";
import DateTimeField              from 'react-bootstrap-datetimepicker';

export default class DatePicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      format: "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]",
      inputFormat: "DD-MM-YYYY HH:mm",
      mode: "date"
    };
  }

  handleChange = (newDate) => {
    this.props.changeValue(this.props.name, newDate);
  }

/*
  componentWillReceiveProps(nextProps) {
    if(nextProps.date) {
      this.setState({
        date: nextProps.date
      });
    }
  }
*/
 
  renderDateTimeField(){
    const {date, format, mode, inputFormat} = this.state;
    let d = new Date();
    d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
    let dateTime = d.toISOString();
    if(this.props.date){
      dateTime = this.props.date
    }
    return (
      <DateTimeField
        dateTime={dateTime}
        showToday={true}
        format={format}
        viewMode={mode}
        inputFormat={inputFormat}
        onChange={this.handleChange}
      />
    );
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
            { this.renderDateTimeField() }
          </div>
        </div>
      </div>
    );
  }
}

