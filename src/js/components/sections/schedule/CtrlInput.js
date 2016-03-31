import React                      from "react";
import Checkbox                   from "../../commons/Checkbox";
import DatePicker                 from "../../commons/DatePicker";
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
      dayName: this.state.dayName,
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
 

  render() {
    let days = [
      {name:'lundi', _id:0},
      {name:'mardi', _id:1},
      {name:'mercredi', _id:2},
      {name:'jeudi', _id:3},
      {name:'vendredi', _id:4},
      {name:'samedi', _id:5},
      {name:'dimanche', _id:6}
    ];
    return (
      <div>
        <Checkbox
          name="isFull"
          label="Complet"
          ref="isFull"
          checked={this.state.isFull}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />

        <Dropdown
          list={days}
          label="Jour"
          onSelect={(value) => { this.changeValue("dayName", value.name); } }
          value={this.props.dayName}/>


        <DatePicker
          name="dayStart"
          label="Début"
          ref="dayStart"
          date={this.state.dayStart}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />

        <DatePicker
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