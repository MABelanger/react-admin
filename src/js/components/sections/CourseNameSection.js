import React                      from "react";
import TextInput                  from "../commons/TextInput";
import CtrlSelect                 from "./ctrl/CtrlSelect";
import CtrlSaveDel                from "./ctrl/CtrlSaveDel";


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

  onSave(){
    console.log('onSave');
  }

  onDelete(){
    console.log('onDelete');
  }

  render() {
    return (
      <div className="container">
        <CtrlSelect
          list={this.props.courses}
          title="Noms de cours"
          currentSelection={ this.setCurrentCourse.bind(this) }
        />
        <TextInput
          name="name"
          label="Nom"
          value={this.state.course.name}
          changeValue={ (name, value) => { this.changeName(name, value); } }
        />
        <CtrlSaveDel
          save={this.onSave}
          delete={this.onDelete}
        />
      </div>
    );
  }
}
