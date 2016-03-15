import React                      from "react";
import TextInput                  from "../commons/TextInput";
import CtrlSelect                 from "./ctrl/CtrlSelect";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
    };
  } 

  changeName(name, value) {
    this.state.course.name = value;
    this.setState({ course: this.state.course });
  }

  setCurrentCourse(course){
    this.setState({ course: course });
    console.log(course);
  }

  render() {
    return (
      <div className="container">
        <CtrlSelect
          list={this.props.courses}
          title="Noms de cours"
          currentSelection={ this.setCurrentCourse.bind(this) }
          save={this.props.save}/>
        <TextInput
          name="name"
          label="Nom"
          value={this.state.course.name}
          changeValue={ (name, value) => { this.changeName(name, value); } }
          />
      </div>
    );
  }
}
