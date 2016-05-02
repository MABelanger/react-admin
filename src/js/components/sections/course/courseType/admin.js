import React                      from "react";
import toastr                     from 'toastr';
import 'toastr/build/toastr.css';

import CourseTypeSection          from "./section";

var courseTypeApi =                  require("./api");

export default class CourseTypeAdmin extends React.Component {

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

  select(courseType){
    this.props.setCourseType(courseType);
    this._resetMsg();
  }

  new(){
    this.props.setCourseType({});
    this._resetMsg();
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
        this._resetMsg();
        this.props.setCourseType(courseType);
        this.list(courseId, teacherId);

        let toastrMsg = { success : 'Le type de cours à été crée.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.courseTypeSection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de création.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
      });
  }


  // Read
  list(courseId, teacherId){
    courseTypeApi.list(courseId, teacherId)
      .then( (courseTypes) => {
        console.log('courseTypes', courseTypes);  
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
        this._resetMsg();
        this.props.setCourseType(courseType);
        this.list(courseId, teacherId);

        let toastrMsg = { success : 'Le type de cours à été crée.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.courseTypeSection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de création.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
      });
  }

  // Delete
  delete(courseType){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;

    courseTypeApi.delete(courseId, teacherId, courseType)
      .then( (msg) => {
        this._resetMsg();
        this.props.setCourseType({});
        this.list(courseId, teacherId);

        let toastrMsg = { success : 'Le Type de cours à été supprimé.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.courseNameSection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de supression.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
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

