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

  changeName(e) {
    var value = this.refs.name.value;
    course = this.state.course;
    course.name = value;
    this.setState({ course: course });
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
          value={this.state.course.name}
          ref="name"
          changeValue={ (e) => { this.changeName(e); } }
          />
      </div>
    );
  }
}
