import React                      from "react";
import toastr                     from 'toastr';
import 'toastr/build/toastr.css';

import ScheduleSection             from "./section";

var scheduleApi =                  require("./api");

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
    let conferenceId = this.props.conferenceId;

    scheduleApi.create(conferenceId, schedule)
      .then( (schedule) => {
        this._resetMsg();
        this.props.setSchedule(schedule);
        this.list(conferenceId);

        let toastrMsg = { success : 'La schedule à été crée.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.scheduleSection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de création.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
      });
  }


  // Read
  list(conferenceId){
    scheduleApi.list(conferenceId)
      .then( (schedules) => {
        this.props.setSchedules(schedules);
      }, (err) => {
        console.log(err);
      });
  }

  // Update
  save(schedule){
    let conferenceId = this.props.conferenceId;

    scheduleApi.save(conferenceId, schedule)
      .then( (schedule) => {
        this._resetMsg();
        this.props.setSchedule(schedule);
        this.list(conferenceId);

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
    let conferenceId = this.props.conferenceId;

    scheduleApi.delete(conferenceId, schedule)
      .then( (msg) => {
        this._resetMsg();
        this.props.setSchedule({});
        this.list(conferenceId);

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

