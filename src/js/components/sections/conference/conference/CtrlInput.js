import React                      from "react";
import TextInput                  from "../../../commons/TextInput";

import * as sectionHelper         from "../../helper";

export default class ConferenceNameCtrlInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        name : "",
        svg : ""
    };
  }

  componentWillMount(){
    this.setState({
      name : this.props.conference.name,
      svg : this.props.conference.svg,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name : nextProps.conference.name,
      svg : nextProps.conference.svg,
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
      name : this.state.name,
      svg : this.state.svg,
    };
  }

/*

*/

  render() {
    return (
      <div>
        <TextInput
          name="name"
          label="Nom"
          ref="name"
          error={sectionHelper.getError("name", this.props.errors)}
          value={this.state.name}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
        <TextInput
          name="svg"
          label="Svg"
          ref="svg"
          error={sectionHelper.getError("svg", this.props.errors)}
          value={this.state.svg}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
      </div>
    );
  }
}