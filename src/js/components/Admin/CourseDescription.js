import React                      from "react";
import toastr                     from 'toastr';
import 'toastr/build/toastr.css';

import CourseDescriptionSection   from "../sections/courseDescription";

var courseDescriptionApi =         require("../../api/courseDescriptionApi");

export default class Admin extends React.Component {

  constructor(props) {
    super(props);
    // expose the method to the parent via props
    this.read = this.read.bind(this);
  }

  componentWillMount(){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;
    this.read(courseId, teacherId);
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
    courseDescriptionApi.create(teacher, courseId)
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
  read(courseId, teacherId){
    courseDescriptionApi.read(courseId, teacherId)
      .then( (courseDescription) => {
        this.props.setCourseDescription(courseDescription);
      }, (err) => {
        console.log(err);
      });
  }

  // Update
  save(teacher){
    let courseId = this.props.courseId;

    courseDescriptionApi.save(teacher, courseId)
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

    courseDescriptionApi.delete(teacher, courseId)
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
      <div>
        <CourseDescriptionSection
          courseDescription={ this.props.courseDescription }
        />
      </div>
    );
  }
}

