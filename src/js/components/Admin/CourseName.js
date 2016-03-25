var coursesApi =                  require("../../api/coursesApi");
import React                      from "react";
import toastr                     from 'toastr';

import CourseNameSection          from "../sections/courseName";


// CSS
import 'toastr/build/toastr.css';



export default class CourseName extends React.Component {

  componentWillMount(){
    this.list();
  }

  select(course){
    this.props.setCourse(course);
  }

  new(){
    this.props.setCourse({});
  }

  /**
   * CRUD Operations
   **/
  // Create
  create(course){
    coursesApi.create(course)
      .then( (course) => {
        this.props.setCourse(course);
        this.list();
        toastr.success('Le cours à été crée.');
      }, (err) => {
        toastr.error('Erreur de création.');
      });
  }

  // Read
  list(){
    coursesApi.getCourses(courses => {
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
        courses={this.props.courses}
        course={this.props.course}
        onSelect={this.select.bind(this)}
        onNew={this.new.bind(this)}

        onCreate={this.create.bind(this)}
        onSave={this.save.bind(this)}
        onDelete={this.delete.bind(this)}
      />
    );
  }
}
