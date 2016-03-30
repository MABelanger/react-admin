import React                      from "react";
import toastr                     from 'toastr';
import 'toastr/build/toastr.css';

import CourseTypeSection          from "../sections/courseType";

var courseTypeApi =                  require("../../api/courseTypeApi");

export default class CourseType extends React.Component {


  componentWillMount(){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;
    this.list(courseId, teacherId);
  }

  select(courseType){
    this.props.setCourseType(courseType);
  }

  new(){
    this.props.setCourseType({});
  }

  /**
   * CRUD Operations
   **/

  // Create
  create(courseType){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;

    courseTypeApi.create(courseId, teacherId, courseType)
      .then( (courseType) => {
        // update teacher and teachers
        this.props.setCourseType(courseType);
        //this.list(courseId, teacherId)
        toastr.success('Le Type de cours à été crée.');
      }, (err) => {
        toastr.error('Erreur de création.', err);
      });
  }


  // Read
  list(courseId, teacherId){
    courseTypeApi.list(courseId, teacherId)
      .then( (courseTypes) => {
        this.props.setCourseTypes(courseTypes);
      }, (err) => {
        console.log(err);
      });
  }

  // Update
  save(courseType){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;

    courseTypeApi.save(courseId, teacherId, courseType)
      .then( (courseType) => {
        this.props.setCourseType(courseType);
        this.list(courseId, teacherId);
        toastr.success('Le Type de cours à été sauvegardé.');
      }, (err) => {
        toastr.error('Erreur de sauvegarde.', err);
      });
  }

  // Delete
  delete(courseType){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;

    courseTypeApi.delete(courseId, teacherId, courseType)
      .then( (msg) => {
        this.props.setCourseType({});
        this.list(courseId, teacherId);
        toastr.success('Le professeur à été supprimé.');
      }, (err) => {
        toastr.error('Erreur Supression', err);
      });
  }

  render() {
    return (
      <div>
        <CourseTypeSection
          ref="courseTypeSection"
          courseTypes={this.props.courseTypes}
          courseType={this.props.courseType}
          onSelect={this.select.bind(this)}
          onNew={this.new.bind(this)}

          onCreate={this.create.bind(this)}
          onSave={this.save.bind(this)}
          onDelete={this.delete.bind(this)}
        />  
      </div>
    );
  }
}

