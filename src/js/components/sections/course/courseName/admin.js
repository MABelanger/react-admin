var coursesApi =                      require("./api");
import React                          from "react";
import toastr                         from 'toastr';

import CourseNameSection              from "./section";

// Flux CourseName
import CourseNameStore             from '../../../../stores/courseNameStore';
import * as CourseNameActions      from '../../../../actions/courseNameActions';
import CourseNameConstants         from '../../../../constants/courseNameConstants';

// CSS
import 'toastr/build/toastr.css';

const LIST_EVENT = CourseNameConstants.READ_EVENT;

export default class CourseNameAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toastrMsg: {},
      errors: {},
    };
  }

  componentWillMount() {
    CourseNameStore.addSavedListener(this.onSaved.bind(this));
    CourseNameStore.addDeletedListener(this.onDeleted.bind(this));
    CourseNameStore.addErrorListener(this.onError.bind(this));
  }

  componentWillUnmount() {
    CourseNameStore.removeSavedListener(this.onSaved.bind(this));
    CourseNameStore.removeDeletedListener(this.onDeleted.bind(this));
    CourseNameStore.removeErrorListener(this.onError.bind(this));
  }

  _resetMsg(){
    this.setState({
      toastrMsg: {},
      errors: {}
    });
  }

  select(course){
    this.props.setCourse(course);
    this._resetMsg();
  }

  new(){
    this.props.setCourse({});
    this._resetMsg();
  }



  /**
   * CRUD Operations
   **/
  // Create
  create(course){
    // coursesApi.create(course)
    //   .then( (course) => {
    //     this._resetMsg();
    //     this.props.setCourse(course);
    //     this.list();

    //     let toastrMsg = { success : 'Le cours à été crée.'};
    //     this.setState({ toastrMsg: toastrMsg });

    //     this.refs.courseNameSection.hideSection();
    //   }, (errors) => {
    //     let toastrMsg = { error : "Erreur de création.<br/>"};
    //     this.setState({ errors: errors, toastrMsg: toastrMsg });
    //   });
    CourseNameActions.createCourseName(course);
  }

  onSaved(){
    let toastrMsg = { success : 'Le cours à été sauvegardé.'};
    this.setState({ toastrMsg: toastrMsg });
    this.refs.courseNameSection.hideSection();
  }

  onDeleted(){
    let toastrMsg = { success : 'Le cours à été supprimé.'};
    this.setState({ toastrMsg: toastrMsg });
    this.refs.courseNameSection.hideSection();
  }

  onError(){
    let errors = CourseNameStore.getErrors();
    console.log('errors', errors)
    let toastrMsg = { error : "Erreur.<br/>"};
    this.setState({ errors: errors, toastrMsg: toastrMsg });
  }

  // Read
  list(){
    coursesApi.list(courses => {
      this.props.setCourses(courses);
    });
  }

  // Update
  save(course){
    // coursesApi.save(course)
    //   .then( (course) => {
    //     this._resetMsg();
    //     this.props.setCourse(course);
    //     this.list();

    //     let toastrMsg = { success : 'Le cours à été Sauvegardé.'};
    //     this.setState({ toastrMsg: toastrMsg });

    //     this.refs.courseNameSection.hideSection();
    //   }, (errors) => {
    //     let toastrMsg = { error : "Erreur de sauvegarde.<br/>"};
    //     this.setState({ errors: errors, toastrMsg: toastrMsg });
    //   });
    CourseNameActions.saveCourseName(course);
  }

  // Delete
  delete(){
    // coursesApi.delete(this.props.course)
    //   .then( (course) => {
    //     this._resetMsg();
    //     this.props.setCourse({});
    //     this.list();

    //     let toastrMsg = { success : 'Le cours à été supprimé.'};
    //     this.setState({ toastrMsg: toastrMsg });

    //     this.refs.courseNameSection.hideSection();
    //   }, (errors) => {
    //     let toastrMsg = { error : "Erreur de supression.<br/>"};
    //     this.setState({ errors: errors, toastrMsg: toastrMsg });
    //   });
    CourseNameActions.deleteCourseName(this.props.course);  
  }

  render() {
    return (
      <CourseNameSection
        ref="courseNameSection"
        courses={this.props.courses}
        course={this.props.course}
        onSelect={this.select.bind(this)}
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

