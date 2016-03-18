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


  changeName(name, value) {
    this.setState({ 
      name: value
    });
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
          changeValue={ (name, value) => { this.changeName(name, value); } }
        />
      </div>
    );
  }
}