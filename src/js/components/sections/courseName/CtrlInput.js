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


  changeValue(name, value) {
    let newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  getCourse(){
    return {
      name : this.state.name,
      svg : this.state.name,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name : nextProps.course.name,
      svg : nextProps.course.svg,
    });
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