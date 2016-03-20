import React                      from "react";
import toastr                     from 'toastr';
import 'toastr/build/toastr.css';

import CourseNameSection          from "./components/sections/courseName";
import TeacherSection             from "./components/sections/teacher";
import * as sectionHelper         from "./components/sections/helper";

var coursesApi =                  require("./api/coursesApi");

export default class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      course: {},
      teacher: {}
    };
    //sectionHelper.fetchAllCourses(this);
  }

  /**
   * Create
   **/
  create(course){
    coursesApi.create(course)
      .then( (course) => {
        this.setState({'course': course});
        this.fetchAllCourses();
        toastr.success('Le cours à été crée.');
      }, (err) => {
        toastr.error('Erreur de création.');
      });
  }

  /**
   * Read
   **/
  fetchAllCourses(){
    coursesApi.getAllCourses(courses => {
      this.setState({'courses' : courses});
    });
  }

  /**
   * Update
   **/
  save(course){
    coursesApi.save(course)
      .then( (course) => {
        this.setState({'course': course});
        this.fetchAllCourses();
        toastr.success('Le cour à été sauvegardé.');
      }, (err) => {
        toastr.error('Erreur de sauvegarde.');
      });
  }

  /**
   * Delete
   **/
  delete(){
    coursesApi.delete(this.state.course)
      .then( (course) => {
        this.setState({'course': {}});
        this.fetchAllCourses();
        toastr.success('Le cour à été supprimé.');
      }, (err) => {
        toastr.error('Erreur Supression', err);
      });
  }

  componentWillMount() {
    this.fetchAllCourses();
  }

  selectCourse(course){
    this.setState({course: course});
  }

  selectTeacher(teacher){
    this.setState({teacher: teacher});
    console.log('selectTeacher', teacher);
  }

  newTeacher(){
    this.setState({teacher: {}});
  }

  saveTeacher(teacherInput){
    let index = coursesApi.getIndexById(this.state.course.teachers, this.state.teacher._id);
    let course = this.state.course;

    let teacher = course.teachers[index];
    // Merge the new value into the existing object.
    for(var attr in teacherInput) {
      if( teacherInput.hasOwnProperty(attr) ){
        teacher[attr] = teacherInput[attr];
      }
    }

    //this.save(course);
    console.log(course);
  }

  render() {
    return (
      <div>
        <CourseNameSection
          onCreate={this.create.bind(this)}
          onFetchAllCourses={this.fetchAllCourses.bind(this)}
          courses={this.state.courses}
          course={this.state.course}
          onSave={this.save.bind(this)}
          onDelete={this.delete.bind(this)}
          onSelect={this.selectCourse.bind(this)}
        />
        <TeacherSection
          teachers={this.state.course.teachers}
          teacher={this.state.teacher}
          onSelect={this.selectTeacher.bind(this)}
          onNew={this.newTeacher.bind(this)}
          onSave={this.saveTeacher.bind(this)}
        />
      </div>
    );
  }
}

