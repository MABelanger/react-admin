import React                      from "react";
import toastr                     from 'toastr';
import 'toastr/build/toastr.css';

import TeacherSection             from "./section";

var teachersApi =                  require("./api");

export default class TeacherAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toastrMsg: {},
      errors: {},
    };
  }

  _resetMsg(){
    this.setState({
      toastrMsg: {},
      errors: {}
    });
  }

  select(teacher){
    this.props.setTeacher(teacher);
    this._resetMsg();
  }

  new(){
    this.props.setTeacher({});
    this._resetMsg();
  }

  /**
   * CRUD Operations
   **/

  // Create
  create(teacher){
    let courseId = this.props.courseId;
    teachersApi.create(teacher, courseId)
      .then( (teacher) => {
        this._resetMsg();
        // update teacher and teachers
        this.props.setTeacher(teacher);
        this.list(courseId);

        let toastrMsg = { success : 'Le professeur à été crée.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.teacherSection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de création.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
      });
  }

  // Read
  list(courseId){
    teachersApi.getTeachers(courseId)
      .then( (teachers) => {
        this.props.setTeachers(teachers);
      }, (err) => {
        console.log(err);
      });
  }

  // Update
  save(teacher){
    let courseId = this.props.courseId;

    teachersApi.save(teacher, courseId)
      .then( (teacher) => {
        this._resetMsg();
        this.props.setTeacher(teacher);

        let toastrMsg = { success : 'Le professeur à été sauvegardé.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.teacherSection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de sauvegarde.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
      });
  }

  // Delete
  delete(teacher){
    let courseId = this.props.courseId;

    teachersApi.delete(teacher, courseId)
      .then( (teacher) => {
        this._resetMsg();
        this.props.setTeacher({});
        this.list(courseId);
 
        let toastrMsg = { success : 'Le professeur à été supprimé.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.teacherSection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de supression.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
      });
  }

  render() {
    return (
      <div>
        <TeacherSection
          ref="teacherSection"
          teachers={this.props.teachers}
          teacher={this.props.teacher}
          onSelect={this.select.bind(this)}
          onNew={this.new.bind(this)}
          errors={this.state.errors}
          toastrMsg={this.state.toastrMsg}
        
          onCreate={this.create.bind(this)}
          onSave={this.save.bind(this)}
          onDelete={this.delete.bind(this)}
        />
      </div>
    );
  }
}

