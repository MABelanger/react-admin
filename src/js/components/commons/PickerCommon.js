import React                      from "react";
import DateTimeField              from 'react-bootstrap-datetimepicker';
import moment                     from 'moment';
import                            "react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css";

const INPUT_FORMAT_DATE = "YYYY-MM-DD",
      INPUT_FORMAT_TIME = "HH:mm",
      FORMAT = "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]",
      DEFAULT_TEXT_DATE = "Please select a date",
      DEFAULT_TEXT_TIME = "Select Hours"


export default class PickerCommon extends React.Component {

  handleChange = (newDate) => {
    console.log('newDate', newDate);
    this.props.changeValue(this.props.name, newDate);
  }

  selectDateTime(mode) {
    let defaultText = null;
    let inputFormat = null;
    let myDate = this.props.date;
    //console.log('-', moment().startOf('day').utcOffset("-04:00").toISOString());
    if(! myDate){
      myDate = String(moment().utcOffset("+00:00").startOf('day').toISOString());//"2016-03-18T20:28:00.000Z"
      console.log('myDate', myDate)
    }

    if (mode == 'date') {
      defaultText = DEFAULT_TEXT_DATE;
      inputFormat = INPUT_FORMAT_DATE;

    } else if(mode == 'time') {
      defaultText = DEFAULT_TEXT_TIME;
      inputFormat = INPUT_FORMAT_TIME;
    }

    //return this.renderDateTime(mode, defaultText, inputFormat, date);
      return (
        <div>
        <DateTimeField
          ref={mode + "Field"}
          mode={mode}
          defaultText="allo"
          dateTime={String(myDate)}
          format={FORMAT}
          inputFormat={inputFormat}
          onChange={this.handleChange}
        />
      </div>
      );
  }

  render() {
    return (
      this.selectDateTime(this.props.mode)
    );
  }
}

