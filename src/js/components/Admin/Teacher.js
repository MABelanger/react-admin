import React                      from "react";
import toastr                     from 'toastr';
import 'toastr/build/toastr.css';

import CourseNameSection          from "../sections/courseName";
import TeacherSection             from "../sections/teacher";
import * as sectionHelper         from "../sections/helper";

var coursesApi =                  require("../../api/coursesApi");
var teachersApi =                  require("../../api/teachersApi");

export default class Admin extends React.Component {

  componentWillMount(){
    this.list();
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
        this.props.setTeacher(teacher);
        console.log(teacher);

        toastr.success('Le cours à été crée.');
      }, (err) => {
        throw err;
        toastr.error('Erreur de création.', err);
      });
  }

  // Read
  list(){
    coursesApi.getCourses(courses => {
      this.setState({'courses' : courses});
    });
  }

  // Update
  save(teacherInput){
    let index = coursesApi.getIndexById(this.props.course.teachers, this.props.teacher._id);
    let course = this.props.course;

    let teacher = course.teachers[index];
    // Merge the new value into the existing object.
    for(var attr in teacherInput) {
      if( teacherInput.hasOwnProperty(attr) ){
        teacher[attr] = teacherInput[attr];
      }
    }
    this.save(course);
  }

  // Delete
  delete(teacher){
    let index = coursesApi.getIndexById(this.props.course.teachers, this.props.teacher._id);
    let course = this.props.course;
    debugger;
    if (index > -1) {
      course.teachers.splice(index, 1);
    }
    this.save(course);
    this.props.setTeacher({})
  }

  render() {
    return (
      <TeacherSection
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

