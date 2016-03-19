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
          label="Prénom"
          ref="firstName"
          value={this.state.firstName}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />

        <TextInput
          name="lastName"
          label="Nom"
          ref="lastName"
          value={this.state.lastName}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />

        <TextInput
          name="schoolName"
          label="Lien Nom"
          ref="schoolName"
          value={this.state.schoolName}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />


        <TextInput
          name="schoolUrl"
          label="Lien URL"
          ref="schoolUrl"
          value={this.state.schoolUrl}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />

        <TextInput
          name="tel"
          label="Tel"
          ref="tel"
          value={this.state.tel}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
      </div>
    );
  }
}