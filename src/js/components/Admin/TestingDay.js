import React                      from "react";
import toastr                     from 'toastr';
import 'toastr/build/toastr.css';

import TestingDaySection             from "../sections/testingDay";

var testingDayApi =                  require("../../api/testingDayApi");

export default class Schedule extends React.Component {


  componentWillMount(){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;
    let courseTypeId = this.props.courseTypeId;
    let scheduleId = this.props.scheduleId;
    this.list(courseId, teacherId, courseTypeId, scheduleId);
  }

  select(testingDay){
    this.props.setTestingDay(testingDay);
  }

  new(){
    this.props.setTestingDay({});
  }

  /**
   * CRUD Operations
   **/

  // Create
  create(testingDay){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;
    let courseTypeId = this.props.courseTypeId;
    let scheduleId = this.props.scheduleId;

    testingDayApi.create(courseId, teacherId, courseTypeId, scheduleId, testingDay)
      .then( (testingDay) => {
        // update teacher and teachers
        this.props.setTestingDay(testingDay);
        this.list(courseId, teacherId, courseTypeId, scheduleId);
        toastr.success('La testingDay à été crée.');
      }, (err) => {
        toastr.error('Erreur de création.', err);
      });
  }


  // Read
  list(courseId, teacherId, courseTypeId, scheduleId){
    console.log('call list')
    testingDayApi.list(courseId, teacherId, courseTypeId, scheduleId)
      .then( (testingDays) => {
        console.log('admin.list', testingDays)
        this.props.setTestingDays(testingDays);
      }, (err) => {
        console.log(err);
      });
  }

  // Update
  save(testingDay){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;
    let courseTypeId = this.props.courseTypeId;
    let scheduleId = this.props.scheduleId;

    testingDayApi.save(courseId, teacherId, courseTypeId, scheduleId, testingDay)
      .then( (testingDay) => {
        this.props.setTestingDay(testingDay);
        this.list(courseId, teacherId, courseTypeId, scheduleId);
        toastr.success('La testingDay à été sauvegardé.');
      }, (err) => {
        toastr.error('Erreur de sauvegarde.', err);
      });
  }

  // Delete
  delete(testingDay){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;
    let courseTypeId = this.props.courseTypeId;
    let scheduleId = this.props.scheduleId;

    testingDayApi.delete(courseId, teacherId, courseTypeId, scheduleId, testingDay)
      .then( (msg) => {
        this.props.setTestingDay({});
        this.list(courseId, teacherId, courseTypeId, scheduleId);
        toastr.success('La testingDay à été supprimé.');
      }, (err) => {
        toastr.error('Erreur Supression', err);
      });
  }

  render() {
    return (
      <div>
        <TestingDaySection
          ref="testingDaySection"
          testingDays={this.props.testingDays}
          testingDay={this.props.testingDay}
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

