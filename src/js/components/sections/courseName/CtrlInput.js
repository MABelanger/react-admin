import React                      from "react";
import TextInput                  from "../../commons/TextInput";

export default class CtrlInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courseName: ""
    };
  }


  changeName(name, value) {
    this.state.courseName = value;
    this.setState({ 
      courseName: this.state.courseName
    });
  }

  getCourseName(){
    return this.state.courseName;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      courseName: nextProps.course.name
    });
  }

  render() {
    return (
      <div>
        <TextInput
          name="courseName"
          label="Nom"
          ref="courseName"
          value={this.state.courseName}
          changeValue={ (name, value) => { this.changeName(name, value); } }
        />
      </div>
    );
  }
}