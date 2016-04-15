var coursesApi =                  require("../../api/coursesApi");
import React                      from "react";
import toastr                     from 'toastr';

import CourseNameSection          from "../sections/courseName";


// CSS
import 'toastr/build/toastr.css';



export default class CourseName extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toastrMsg: {},
      errors: {},
    };
  }

  componentWillMount(){
    this.list();
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
    coursesApi.create(course)
      .then( (course) => {
        this._resetMsg();
        this.props.setCourse(course);
        this.list();

        let toastrMsg = { success : 'Le cours à été crée.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.courseNameSection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de création.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
      });
  }

  // Read
  list(){
    coursesApi.list(courses => {
      this.props.setCourses(courses);
    });
  }

  // Update
  save(course){
    coursesApi.save(course)
      .then( (course) => {
        this.props.setCourse(course);
        this.list();
        toastr.success('Le cour à été sauvegardé.');
        this.refs.courseNameSection.hideSection();
      }, (err) => {
        toastr.error('Erreur de sauvegarde.', err);
      });
  }

  // Delete
  delete(){
    coursesApi.delete(this.props.course)
      .then( (course) => {
        this.props.setCourse({});
        this.list();
        toastr.success('Le cour à été supprimé.');
      }, (err) => {
        toastr.error('Erreur Supression', err);
      });
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

