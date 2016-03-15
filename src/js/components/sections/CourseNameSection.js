import React                      from "react";
import TextInput                  from "../commons/TextInput";
import SectionTop                 from "../commons/sectionTop/SectionTop";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
    };
  }

  changeName(name, value) {

    var course = this.state.course;
    course.name = value;
    this.setState({ course: course });
    console.log(course);
    debugger;
  }

  setCurrentCourse(course){
    this.setState({ course: course });
    console.log(course);
  }

  render() {
    return (
      <div className="container">
        <SectionTop
          list={this.props.courses}
          title="Noms de cours"
          currentSelection={ this.setCurrentCourse.bind(this) }/>
        <TextInput
          name="name"
          label="Nom"
          ref="txtInput"
          value={this.state.course.name}
          changeValue={ (name, value) => { this.changeName(name, value); } }
          />
      </div>
    );
  }
}
