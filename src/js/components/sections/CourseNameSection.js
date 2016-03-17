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


  onSave(e){
    console.log('onSave');
    //console.log('this.refs', this.refs.ctrlInput.refs.courseName.refs.courseName.value);
    let courseName = this.refs.ctrlInput.getCourseName();
    let course= this.props.course;
    course.name = courseName;
    if(course._id) {
      this.props.onSave(course);
    }
    else{
      this.props.onCreate(course);
    }
  }

  onDelete(e){
    this.props.onDelete(this.props.course);
  }


  render() {
    return (
      <div className="container">
        <CtrlSelect
          list={this.props.courses}
          title="Noms de cours"
          onSelect={ this.props.onSelect }
          onNew={ this.props.onNew }
          value={ this.props.course.name }
        />

        <CtrlInput ref="ctrlInput" course={this.props.course} />

        <CtrlSaveDel
          onSave={ (e)=>{ this.onSave(e); } }
          onDelete={ (e)=>{ this.onDelete(e); } }
        />
      </div>
    );
  }
}
