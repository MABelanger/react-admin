import React                      from "react";
import TextInput                  from "../../commons/TextInput";

export default class CtrlInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        name : "",
        svg : ""
    };
  }

  componentWillMount(){
    this.setState({
      name : this.props.course.name,
      svg : this.props.course.svg,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name : nextProps.course.name,
      svg : nextProps.course.svg,
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



  render() {
    return (
      <TextInput
        name="name"
        label="Nom"
        ref="name"
        error={this.getError("name")}
        value={this.state.name}
        changeValue={ (name, value) => { this.changeValue(name, value); } }
      />
    );
  }
}