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
    this.state.course.name = value;
    this.setState({ course:  this.state.course });
  }

  currentSelection(course){
    this.state.course = course;
  }

  render() {
    return (
      <div className="container">
        <SectionTop list={this.props.courses} title="Noms de cours" currentSelection={this.currentSelection}/>
        <TextInput
          name="name"
          label="Nom"
          value={this.state.course.name}
          changeValue={this.changeName.bind(this)}
          />
      </div>
    );
  }
}
