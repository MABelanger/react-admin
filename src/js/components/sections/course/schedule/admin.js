import React                          from "react";
import toastr                         from 'toastr';

import ScheduleSection                from "./section";

// Flux Schedule
import ScheduleStore                  from '../../../../stores/scheduleStore';
import * as ScheduleActions           from '../../../../actions/scheduleActions';
import ScheduleConstants              from '../../../../constants/scheduleConstants';

// CSS
import 'toastr/build/toastr.css';

export default class ScheduleAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toastrMsg: {},
      errors: {},
    };
  }

  componentWillMount() {
    ScheduleStore.addSavedListener(this.onSaved.bind(this));
    ScheduleStore.addDeletedListener(this.onDeleted.bind(this));
    ScheduleStore.addErrorListener(this.onError.bind(this));
  }

  componentWillUnmount() {
    ScheduleStore.removeSavedListener(this.onSaved.bind(this));
    ScheduleStore.removeDeletedListener(this.onDeleted.bind(this));
    ScheduleStore.removeErrorListener(this.onError.bind(this));
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

  /*
   * listener called by the store
   */

  onSaved(){
    this._resetMsg();
    let toastrMsg = { success : 'La schedule à été sauvegardé.'};
    this.setState({ toastrMsg: toastrMsg });
    this.refs.scheduleSection.hideSection();
  }

  onDeleted(){
    this._resetMsg();
    let toastrMsg = { success : 'La schedule à été supprimé.'};
    this.setState({ toastrMsg: toastrMsg });
    this.refs.scheduleSection.hideSection();
  }

  onError(){
    this._resetMsg();
    let errors = ScheduleStore.getErrors();
    console.log('errors', errors)
    let toastrMsg = { error : "Erreur.<br/>"};
    this.setState({ errors: errors, toastrMsg: toastrMsg });
  }

  /**
   * CRUD Operations
   **/
  // Create
  create(schedule){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;
    let courseTypeId = this.props.courseTypeId;
    ScheduleActions.createSchedule(schedule, courseId, teacherId, courseTypeId);
  }

  // Read is admin by the parent component.

  // Update
  save(schedule){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;
    let courseTypeId = this.props.courseTypeId;
    ScheduleActions.saveSchedule(schedule, courseId, teacherId, courseTypeId);
  }

  // Delete
  delete(){
    let courseId = this.props.courseId;
    let teacherId = this.props.teacherId;
    let courseTypeId = this.props.courseTypeId;
    ScheduleActions.deleteSchedule(this.props.schedule, courseId, teacherId, courseTypeId);  
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
