import React                      from "react";
import TextInput                  from "../commons/TextInput";
import CtrlSelect                 from "./ctrl/CtrlSelect";
import CtrlSaveDel                from "./ctrl/CtrlSaveDel";


class CtrlInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courseName: "",
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
        <TextInput
          name="courseName"
          label="Nom"
          ref="courseName"
          value={this.state.courseName}
          changeValue={ (name, value) => { this.changeName(name, value); } }
        />
    );
  }
}



export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
    };
  } 

  onSelect(course){
    this.setState({ course: course });
  }

  onSave(e){
    console.log('onSave');
    //console.log('this.refs', this.refs.ctrlInput.refs.courseName.refs.courseName.value);
    let courseName = this.refs.ctrlInput.getCourseName();
    this.state.course.name = courseName;
    this.setState({course: this.state.course })

    if(this.state.course._id) {
      this.props.onSave(this.state.course);
    }
    else{
      this.props.onCreate(this.state.course);
    }
  }

  onCreate(){
    console.log('onCreate')
    let course = {};
    this.setState({course: course });
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
          onSelect={ this.onSelect.bind(this) }
          onCreate={ this.onCreate.bind(this) }
          value = { this.state.course.name }
        />

        <CtrlInput ref="ctrlInput" course={this.state.course} />

        <CtrlSaveDel
          onSave={ (e)=>{ this.onSave(e); } }
          onDelete={this.onDelete.bind(this)}
        />
      </div>
    );
  }
}
