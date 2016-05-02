import React                      from "react";
import TextInput                  from "../../../commons/TextInput";
import * as sectionHelper         from "../../helper";

export default class ConferenceNameCtrlInput extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: ""
    }
  }

  componentWillMount(){
    this.setState({
      firstName : this.props.speaker.firstName,
      lastName : this.props.speaker.lastName
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      firstName : nextProps.speaker.firstName,
      lastName : nextProps.speaker.lastName
    });
  }

  changeValue(name, value) {
    let newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  getError(name) {
    if (this.props.errors[name]){
      return this.props.errors[name].message;
    } else {
      return '';
    }
  }

  getFields(){
    return {
      firstName : this.state.firstName,
      lastName : this.state.lastName,
    };
  }

  render() {
    return (
      <div>
        <TextInput
          name="firstName"
          label="Prénom"
          ref="firstName"
          error={sectionHelper.getError("firstName", this.props.errors)}
          value={this.state.firstName}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
        <TextInput
          name="lastName"
          label="Nom"
          ref="lastName"
          error={sectionHelper.getError("lastName", this.props.errors)}
          value={this.state.lastName}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
      </div>
    );
  }
}
