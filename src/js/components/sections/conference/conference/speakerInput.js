import React                      from "react";
import TextInput                  from "../../../commons/TextInput";
import * as sectionHelper         from "../../helper";

export default class ConferenceNameCtrlInput extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
    }
  }


  componentWillMount(){
    if(this.props.speaker){
      this.setState({
        firstName : this.props.speaker.firstName,
        lastName : this.props.speaker.lastName
      });
    }
  }


  _getNames(speaker){
    let firstName = null;
    let lastName = null;
    if(speaker){
      firstName = speaker.firstName;
      lastName = speaker.lastName;
    }
    return {
      firstName : firstName,
      lastName : lastName
    }
  }

  componentWillReceiveProps(nextProps) {
    let {firstName, lastName} = this._getNames(nextProps.speaker)
    this.setState({
      firstName : firstName,
      lastName : lastName
    });

  }


  changeValue(name, value) {
    // let newState = this.state;
    // newState[name] = value;
    // this.setState(newState);
    this.props.changeValue("speaker", this.getFields());
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
        lastName : this.state.lastName
    };
  }

  render() {


    return (
      <div>

      </div>
    );
  }
}
