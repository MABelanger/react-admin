import React                      from "react";
import Checkbox                   from "../../commons/Checkbox";

export default class CtrlInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
      isFull: this.state.isFull
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.schedule) {
      this.setState({
        isFull: nextProps.schedule.isFull,
        description: nextProps.schedule.description,
      });
    }
  }
 
 /*
                  "isFull": false,
                  "hourStart": "13:00:00",
                  "hourEnd": "14:15:00",
                  "dayEnd": "2016-06-13",
                  "dayStart": "2016-01-12",
                  "dayName": "mardi",
*/
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
      </div>
    );
  }
}