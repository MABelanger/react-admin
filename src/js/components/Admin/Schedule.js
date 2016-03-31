import React                      from "react";
import toastr                     from 'toastr';
import 'toastr/build/toastr.css';

import ScheduleSection             from "../sections/schedule";

var scheduleApi =                  require("../../api/scheduleApi");

export default class Schedule extends React.Component {


  componentWillMount(){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;
    let courseTypeId = this.props.courseTypeId;
    this.list(courseId, teacherId, courseTypeId);
  }

/*
  componentWillReceiveProps(nextProps) {
    let courseId = nextProps.courseId;
    let teacherId = nextProps.teacherId;
    let courseTypeId = nextProps.courseTypeId;
    this.list(courseId, teacherId, courseTypeId);
  }
*/
  select(schedule){
    this.props.setSchedule(schedule);
  }

  new(){
    this.props.setSchedule({});
  }

  /**
   * CRUD Operations
   **/

  // Create
  create(schedule){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;
    let courseTypeId = this.props.courseTypeId;

    scheduleApi.create(courseId, teacherId, courseTypeId, schedule)
      .then( (schedule) => {
        // update teacher and teachers
        this.props.setSchedule(schedule);
        this.list(courseId, teacherId, courseTypeId);
        toastr.success('La schedule à été crée.');
      }, (err) => {
        toastr.error('Erreur de création.', err);
      });
  }


  // Read
  list(courseId, teacherId, courseTypeId){
    console.log('call list')
    scheduleApi.list(courseId, teacherId, courseTypeId)
      .then( (schedules) => {
        console.log('admin.list', schedules)
        this.props.setSchedules(schedules);
      }, (err) => {
        console.log(err);
      });
  }

  // Update
  save(schedule){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;
    let courseTypeId = this.props.courseTypeId;

    scheduleApi.save(courseId, teacherId, courseTypeId, schedule)
      .then( (schedule) => {
        this.props.setSchedule(schedule);
        this.list(courseId, teacherId, courseTypeId);
        toastr.success('La schedule à été sauvegardé.');
      }, (err) => {
        toastr.error('Erreur de sauvegarde.', err);
      });
  }

  // Delete
  delete(schedule){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;
    let courseTypeId = this.props.courseTypeId;

    scheduleApi.delete(courseId, teacherId, courseTypeId, schedule)
      .then( (msg) => {
        this.props.setSchedule({});
        this.list(courseId, teacherId, courseTypeId);
        toastr.success('La schedule à été supprimé.');
      }, (err) => {
        toastr.error('Erreur Supression', err);
      });
  }

  render() {
    return (
      <div>
        <ScheduleSection
          ref="scheduleSection"
          schedules={this.props.schedules}
          schedule={this.props.schedule}
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

