import React                      from "react";
import toastr                     from 'toastr';
import 'toastr/build/toastr.css';

import CourseDescriptionSection   from "./section";

var courseDescriptionApi =         require("./api");

export default class CourseDescriptionAdmin extends React.Component {

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

  new(){
    this.props.setCourseDescription({});
    this._resetMsg();
  }

  /**
   * CRUD Operations
   **/

  // Create
  create(courseDescription){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;

    courseDescriptionApi.create(courseId, teacherId, courseDescription)
      .then( (courseDescription) => {
        this._resetMsg();
        this.props.setCourseDescription(courseDescription);

        let toastrMsg = { success : 'La description de cours à été crée.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.courseDescriptionSection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de création.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
      });
  }

  // read
  read(courseId, teacherId){
    courseDescriptionApi.read(courseId, teacherId)
      .then( (courseDescription) => {
        this.props.setCourseDescription(courseDescription);
      }, (err) => {
        console.log(err);
      });
  }


  // Update
  save(courseDescription){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;

    courseDescriptionApi.save(courseId, teacherId, courseDescription)
      .then( (courseDescription) => {
        this._resetMsg();
        this.props.setCourseDescription(courseDescription);

        let toastrMsg = { success : 'La description de cours à été crée.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.courseDescriptionSection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de création.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
      });
  }

  // Delete
  delete(){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;

    courseDescriptionApi.delete(courseId, teacherId)
      .then( (msg) => {
        this._resetMsg();
        this.props.setCourseDescription({});

        let toastrMsg = { success : 'La description de cours à été supprimer.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.courseDescriptionSection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de supression.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
      });
  }

  render() {
    return (
        <CourseDescriptionSection
          ref="courseDescriptionSection"
          courseDescription={ this.props.courseDescription }
          onNew={this.new.bind(this)}
          errors={this.state.errors}
          toastrMsg={this.state.toastrMsg}

          onCreate={this.create.bind(this)}
          onSave={this.save.bind(this)}
          onDelete={this.delete.bind(this)}
        />
    );
  }
}

