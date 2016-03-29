import React                      from "react";
import toastr                     from 'toastr';
import 'toastr/build/toastr.css';

import CourseDescriptionSection   from "../sections/courseDescription";

var courseDescriptionApi =         require("../../api/courseDescriptionApi");

export default class Admin extends React.Component {

  constructor(props) {
    super(props);
    // expose the method to the parent via props
    this.update = this.update.bind(this);
  }

  componentWillMount(){
    console.log('componentWillMount')
    this.read();
  }

  /*
  componentWillReceiveProps(nextProps) {
    this.setState({
      likesIncreasing: nextProps.likeCount > this.props.likeCount
    });
  }
  */

  new(){
    this.props.setCourseDescription({});
  }

  /**
   * CRUD Operations
   **/

  // Create
  create(courseDescription){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;

    console.log('create.courseId', courseId);
    console.log('create.teacherId', teacherId);
    console.log('create.courseDescription', courseDescription)

    courseDescriptionApi.create(courseId, teacherId, courseDescription)
      .then( (courseDescription) => {
        // update courseDescription and courseDescriptions
        console.log('courseDescription', courseDescription)
        this.props.setCourseDescription(courseDescription);
        toastr.success('La description du cours à été crée.');
      }, (err) => {
        toastr.error('Erreur de création.', err);
      });
  }

  // tmp
  update(courseId, teacherId){
    courseDescriptionApi.read(courseId, teacherId)
      .then( (courseDescription) => {
        this.props.setCourseDescription(courseDescription);
      }, (err) => {
        console.log(err);
      });
  }

  // Read
  read(){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;
    this.update(courseId, teacherId);
  }

  // Update
  save(courseDescription){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;
    console.log('save.courseId', courseId);
    console.log('save.teacherId', teacherId);

    courseDescriptionApi.save(courseId, teacherId, courseDescription)
      .then( (courseDescription) => {
        this.props.setCourseDescription(courseDescription);
        console.log('courseDescriptionApi.save.courseDescription', courseDescription)
        toastr.success('La description du cours à été sauvegardé.');
      }, (err) => {
        toastr.error('Erreur de sauvegarde.', err);
      });
  }

  // Delete
  delete(){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;

    courseDescriptionApi.delete(courseId, teacherId)
      .then( (msg) => {
        this.props.setCourseDescription({});
        toastr.success('La description du cours à été supprimé.');
      }, (err) => {
        toastr.error('Erreur Supression', err);
      });
  }

  render() {
    return (
        <CourseDescriptionSection
          ref="courseDescriptionSection"
          courseDescription={ this.props.courseDescription }
          onNew={this.new.bind(this)}

          onCreate={this.create.bind(this)}
          onSave={this.save.bind(this)}
          onDelete={this.delete.bind(this)}
        />
    );
  }
}

