import React                      from "react";
import TextInput                  from "../../commons/TextInput";

export default class CtrlInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      schoolName: "",
      schoolUrl: "",
      tel: ""
    };
  }


  changeValue(name, value) {
    let newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  getCourse(){
    return {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      schoolName: this.state.schoolName,
      schoolUrl: this.state.schoolUrl,
      tel: this.state.tel
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.teacher) {
      this.setState({
        firstName: nextProps.teacher.firstName,
        lastName: nextProps.teacher.lastName,
        schoolName: nextProps.teacher.schoolName,
        schoolUrl: nextProps.teacher.schoolUrl,
        tel: nextProps.teacher.tel
      });
    }
  }

  render() {
    return (
      <div>
        <TextInput
          name="firstName"
          label="Nom"
          ref="firstName"
          value={this.state.firstName}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
      </div>
    );
  }
}