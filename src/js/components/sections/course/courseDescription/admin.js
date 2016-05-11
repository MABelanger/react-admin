import React                          from "react";
import toastr                         from 'toastr';
import 'toastr/build/toastr.css';

import CourseDescriptionSection              from "./section";

// Flux CourseDescription
import CourseDescriptionStore                from '../../../../stores/course/courseDescriptionStore';
import * as CourseDescriptionActions         from '../../../../actions/course/courseDescriptionActions';
import CourseDescriptionConstants            from '../../../../constants/course/courseDescriptionConstants';



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

  select(courseDescription){
    this.props.setCourseDescription(courseDescription);
    this._resetMsg();
  }

  new(){
    this.props.setCourseDescription({});
    this._resetMsg();
  }
  componentWillMount() {
    CourseDescriptionStore.addSavedListener(this.onSaved.bind(this));
    CourseDescriptionStore.addDeletedListener(this.onDeleted.bind(this));
    CourseDescriptionStore.addErrorListener(this.onError.bind(this));
  }

  componentWillUnmount() {
    CourseDescriptionStore.removeSavedListener(this.onSaved.bind(this));
    CourseDescriptionStore.removeDeletedListener(this.onDeleted.bind(this));
    CourseDescriptionStore.removeErrorListener(this.onError.bind(this));
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

  /*
   * listener called by the store
   */

  onSaved(){
    this._resetMsg();
    let toastrMsg = { success : 'La description de cours à été sauvegardé.'};
    this.setState({ toastrMsg: toastrMsg });
    this.refs.courseDescriptionSection.hideSection();
  }

  onDeleted(){
    this._resetMsg();
    let toastrMsg = { success : 'La description de cours à été supprimé.'};
    this.setState({ toastrMsg: toastrMsg });
    this.refs.courseDescriptionSection.hideSection();
  }

  onError(){
    this._resetMsg();
    let errors = CourseDescriptionStore.getErrors();
    let toastrMsg = { error : "Erreur.<br/>"};
    this.setState({ errors: errors, toastrMsg: toastrMsg });
  }

  /**
   * CRUD Operations
   **/
  // Create
  create(courseDescription){
    CourseDescriptionActions.createCourseDescription(courseDescription, this.props.courseId, this.props.teacherId);
  }

  // Read is admin by the parent component.

  // Update
  save(courseDescription){
    CourseDescriptionActions.saveCourseDescription(courseDescription, this.props.courseId, this.props.teacherId);
  }

  // Delete
  delete(){
    CourseDescriptionActions.deleteCourseDescription(this.props.courseDescription, this.props.courseId, this.props.teacherId);  
  }

  // toastrMsg={this.state.toastrMsg}
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

