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
      dayName: null,
      isFull: false,
      dayStart: null,
      dayEnd: null
    };
  }

  changeValue(name, value) {
    let newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  getFields(){
    return {
      dayName: this.state.dayName.name,
      isFull: this.state.isFull,
      dayStart: this.state.dayStart,
      dayEnd: this.state.dayEnd
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.schedule) {
      this.setState({
        dayName: nextProps.schedule.dayName,
        isFull: nextProps.schedule.isFull,
        dayStart: nextProps.schedule.dayStart,
        dayEnd: nextProps.schedule.dayEnd
      });
    }
  }
 
 selectDayName(dayName){
   this.changeValue(dayName.value);
 }

/*
        <DatePicker
          name="dayEnd"
          label="Fin"
          ref="dayEnd"
          date={this.state.dayEnd}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
*/

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

  renderDates(){
    return(
        <div className="row">
          <div className="col-sm-offset-1 col-sm-1">
            {this.renderCheckBox()}
          </div>
          <div className="col-sm-3">
            <b>Début:</b><br/>
            <TimePicker
              name="dayStart"
              label="Début"
              ref="dayStart"
              date={this.state.dayStart}
              changeValue={ (name, value) => { this.changeValue(name, value); } }
            />
          </div>
          <div className="col-sm-3">
            <b>Fin:</b><br/>
            <TimePicker
              name="dayEnd"
              label="Fin"
              ref="dayEnd"
              date={this.state.dayEnd}
              changeValue={ (name, value) => { this.changeValue(name, value); } }
            />
          </div>
          <div className="col-sm-4">&nbsp;</div>
        </div>
    );
  }

  renderHours(){
    return(
        <div className="row">
          <div className="col-sm-offset-2 col-sm-3">
            <b>Du:</b><br/>
            <DatePicker
              name="dayStart"
              label="Début"
              ref="dayStart"
              date={this.state.dayStart}
              changeValue={ (name, value) => { this.changeValue(name, value); } }
            />
          </div>
          <div className="col-sm-3">
            <b>Au:</b><br/>
            <DatePicker
              name="dayEnd"
              label="Fin"
              ref="dayEnd"
              date={this.state.dayEnd}
              changeValue={ (name, value) => { this.changeValue(name, value); } }
            />
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
        {this.renderDates()}
        {this.renderHours()}
      </div>
    );
  }
}