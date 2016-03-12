import React from "react";

import TextInput from "./TextInput";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  changeValue(name, value) {
    console.log(name, value)
    this.state.courses[name] = value;
    this.setState({ courses:  this.state.courses });
  }

  render() {
    return (
      <div>
        <TextInput
          name="name"
          label="Nom"
          value={this.state.courses.name}
          changeValue={this.changeValue.bind(this)}
          />
      </div>
    );
  }
}

