import React                      from "react";
import DateTimeField              from 'react-bootstrap-datetimepicker';
import moment                     from 'moment';

const INPUT_FORMAT_DATE = "YYYY-MM-DD",
      INPUT_FORMAT_TIME = "HH:mm",
      FORMAT = "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]",
      DEFAULT_TEXT_DATE = "Please select a date",
      DEFAULT_TEXT_TIME = "Select Hours"


export default class DateTimePicker extends React.Component {

  handleChange = (newDate) => {
    console.log('newDate', newDate);
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

  renderDateTime(mode, defaultText, inputFormat, date){

    if (date) {
      return (
        <DateTimeField
          mode={mode}
          defaultText={defaultText}
          dateTime={date}
          format={FORMAT}
          inputFormat={inputFormat}
          onChange={this.handleChange}
        />);
    } else {
      return (
        <DateTimeField
          mode={mode}
          defaultText={defaultText}
          showToday={true}
          format={FORMAT}
          inputFormat={inputFormat}
          onChange={this.handleChange}
        />);
    }
  }
  selectDateTime(mode) {
    let defaultText = null;
    let inputFormat = null;
    let date = this.props.date;

    if (mode == 'date') {
      defaultText = DEFAULT_TEXT_DATE;
      inputFormat = INPUT_FORMAT_DATE;
    } else {
      defaultText = DEFAULT_TEXT_TIME;
      inputFormat = INPUT_FORMAT_TIME;
    }

    return this.renderDateTime(mode, defaultText, inputFormat, date);
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
            { this.selectDateTime('date') }
            { this.selectDateTime('time') }
          </div>
        </div>
      </div>
    );
  }
}

