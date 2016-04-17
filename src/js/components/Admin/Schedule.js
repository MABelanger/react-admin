import React                      from "react";
import toastr                     from 'toastr';
import 'toastr/build/toastr.css';

import ScheduleSection             from "../sections/schedule";

var scheduleApi =                  require("../../api/scheduleApi");

export default class Schedule extends React.Component {

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

  select(schedule){
    this.props.setSchedule(schedule);
    this._resetMsg();
  }

  new(){
    this.props.setSchedule({});
    this._resetMsg();
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
        this._resetMsg();
        this.props.setSchedule(schedule);
        this.list(courseId, teacherId, courseTypeId);

        let toastrMsg = { success : 'La schedule à été crée.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.scheduleSection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de création.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
      });
  }


  // Read
  list(courseId, teacherId, courseTypeId){
    console.log('call list')
    scheduleApi.list(courseId, teacherId, courseTypeId)
      .then( (schedules) => {
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
        this._resetMsg();
        this.props.setSchedule(schedule);
        this.list(courseId, teacherId, courseTypeId);

        let toastrMsg = { success : 'La schedule à été crée.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.scheduleSection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de création.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
      });
  }

  // Delete
  delete(schedule){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;
    let courseTypeId = this.props.courseTypeId;

    scheduleApi.delete(courseId, teacherId, courseTypeId, schedule)
      .then( (msg) => {
        this._resetMsg();
        this.props.setSchedule({});
        this.list(courseId, teacherId, courseTypeId);

        let toastrMsg = { success : 'La schedule à été supprimé.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.scheduleSection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de supression.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
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

