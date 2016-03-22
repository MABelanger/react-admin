import React                      from "react";
import toastr                     from 'toastr';
import 'toastr/build/toastr.css';

import CourseNameSection          from "../sections/courseName";
import TeacherSection             from "../sections/teacher";


var coursesApi =                  require("../../api/coursesApi");
var teachersApi =                  require("../../api/teachersApi");

export default class Admin extends React.Component {


  componentWillMount(){
    let courseId = this.props.courseId;
    this.list(courseId);
  }

  select(teacher){
    this.props.setTeacher(teacher);
  }

  new(){
    this.props.setTeacher({});
  }

  /**
   * CRUD Operations
   **/

  // Create
  create(teacher){
    let courseId = this.props.courseId;
    teachersApi.create(teacher, courseId)
      .then( (teacher) => {
        // update teacher and teachers
        this.props.setTeacher(teacher);
        this.list(courseId)
        toastr.success('Le professeur à été crée.');
      }, (err) => {
        toastr.error('Erreur de création.', err);
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
        this.props.setTeacher(teacher);
        toastr.success('Le professeur à été sauvegardé.');
      }, (err) => {
        toastr.error('Erreur de sauvegarde.', err);
      });
  }

  // Delete
  delete(teacher){
    let courseId = this.props.courseId;

    teachersApi.delete(teacher, courseId)
      .then( (teacher) => {
        this.props.setTeacher({});
        this.list(courseId);
        toastr.success('Le professeur à été supprimé.');
      }, (err) => {
        toastr.error('Erreur Supression', err);
      });
  }

  render() {
    return (
      <TeacherSection
        ref="teacherSection"
        teachers={this.props.teachers}
        teacher={this.props.teacher}
        onSelect={this.select.bind(this)}
        onNew={this.new.bind(this)}

        onCreate={this.create.bind(this)}
        onSave={this.save.bind(this)}
        onDelete={this.delete.bind(this)}
      />
    );
  }
}

