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

  getFields(){
    return {
      name : this.state.name,
      svg : this.state.name,
    };
  }

  render() {
    return (
      <div>
        <TextInput
          name="name"
          label="Nom"
          ref="name"
          value={this.state.name}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
      </div>
    );
  }
}