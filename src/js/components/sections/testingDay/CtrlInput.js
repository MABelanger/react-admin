import React                      from "react";
import CheckboxCommon             from "../../commons/CheckboxCommon";
import DatePicker                 from "../../commons/DatePicker";
import TimePicker                 from "../../commons/TimePicker";

import 'awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css';
import 'font-awesome/css/font-awesome.css'; 

export default class CtrlInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      day: null,
      isFull: false,
    };
  }

  changeValue(name, value) {
    let newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  getFields(){
    return {
      day: this.state.day.name,
      isFull: this.state.isFull
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.schedule) {
      this.setState({
        day: nextProps.schedule.day,
        isFull: nextProps.schedule.isFull
      });
    }
  }
 
 selectDayName(day){
   this.changeValue(day.value);
 }

  renderCheckBox(){
    return(
      <form role="form">
        &nbsp;<br/>
        <div class="checkbox abc-checkbox">
          <CheckboxCommon
            id="checkbox1"
            className="pull-left"
            name="isFull"
            label="Complet"
            ref="isFull"
            checked={this.state.isFull}
            changeValue={ (name, value) => { this.changeValue(name, value); } }
          />
          <label for="checkbox1">
              <b>Complet</b>
          </label>
        </div>
      </form>
    );
  }

  renderDate(){
    return(
        <div className="row">
          <div className="col-sm-offset-1 col-sm-1">
            {this.renderCheckBox()}
          </div>
          <div className="col-sm-3">
            <b>Jour:</b><br/>
            <DatePicker
              name="day"
              label="Jour"
              ref="day"
              date={this.state.day}
              changeValue={ (name, value) => { this.changeValue(name, value); } }
            />
          </div>
          <div className="col-sm-3">
            &nbsp;
          </div>
          <div className="col-sm-4">
            <br/>
            {this.props.ctrlSaveDel()}
          </div>
        </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderDate()}
      </div>
    );
  }
}