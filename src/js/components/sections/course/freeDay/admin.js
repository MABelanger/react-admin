import React                      from "react";
import toastr                     from 'toastr';
import 'toastr/build/toastr.css';

import FreeDaySection             from "./section";

var freeDayApi =                  require("./api");

export default class ScheduleAdmin extends React.Component {

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

  select(freeDay){
    this.props.setFreeDay(freeDay);
    this._resetMsg();
  }

  new(){
    this.props.setFreeDay({});
    this._resetMsg();
  }

  /**
   * CRUD Operations
   **/

  // Create
  create(freeDay){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;
    let courseTypeId = this.props.courseTypeId;
    let scheduleId = this.props.scheduleId;

    freeDayApi.create(courseId, teacherId, courseTypeId, scheduleId, freeDay)
      .then( (freeDay) => {
        this._resetMsg();
        this.props.setFreeDay(freeDay);
        this.list(courseId, teacherId, courseTypeId, scheduleId);

        let toastrMsg = { success : 'Le jours d\'essaie à été crée.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.freeDaySection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de création.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
      });
  }


  // Read
  list(courseId, teacherId, courseTypeId, scheduleId){
    freeDayApi.list(courseId, teacherId, courseTypeId, scheduleId)
      .then( (freeDays) => {
        this.props.setFreeDays(freeDays);
      }, (err) => {
        console.log(err);
      });
  }

  // Update
  save(freeDay){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;
    let courseTypeId = this.props.courseTypeId;
    let scheduleId = this.props.scheduleId;

    freeDayApi.save(courseId, teacherId, courseTypeId, scheduleId, freeDay)
      .then( (freeDay) => {
        this._resetMsg();
        this.props.setFreeDay(freeDay);
        this.list(courseId, teacherId, courseTypeId, scheduleId);

        let toastrMsg = { success : 'Le jours d\'essaie à été crée.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.freeDaySection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de création.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
      });
  }

  // Delete
  delete(freeDay){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;
    let courseTypeId = this.props.courseTypeId;
    let scheduleId = this.props.scheduleId;

    freeDayApi.delete(courseId, teacherId, courseTypeId, scheduleId, freeDay)
      .then( (msg) => {
        this._resetMsg();
        this.props.setFreeDay({});
        this.list(courseId, teacherId, courseTypeId, scheduleId);

        let toastrMsg = { success : 'Le jours d\'essaie à été supprimer.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.freeDaySection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de supression.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
      });
  }

  render() {
    return (
      <div>
        <FreeDaySection
          ref="freeDaySection"
          freeDays={this.props.freeDays}
          freeDay={this.props.freeDay}
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

