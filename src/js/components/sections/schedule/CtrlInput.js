import React                      from "react";
import Checkbox                   from "../../commons/Checkbox";
import DateTimePicker                 from "../../commons/DateTimePicker";
import Dropdown                   from "../../commons/dropdown/Dropdown";
import DateTimeField              from 'react-bootstrap-datetimepicker';

export default class CtrlInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dayName: "",
      isFull: false,
      dayStart: "",
      dayEnd: ""
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

  render() {
    return (
      <div>
        <Checkbox
          name="isFull"
          label="Complet"
          ref="isFull"
          checked={this.state.isFull}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />

        <DateTimePicker
          name="dayStart"
          label="Début"
          ref="dayStart"
          date={this.state.dayStart}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />

        <DateTimePicker
          name="dayEnd"
          label="Fin"
          ref="dayEnd"
          date={this.state.dayEnd}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />

      </div>
    );
  }
}