import React                      from "react";
import toastr                     from 'toastr';
import 'toastr/build/toastr.css';

import TestingDaySection             from "../sections/testingDay";

var testingDayApi =                  require("../../api/testingDayApi");

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

  select(testingDay){
    this.props.setTestingDay(testingDay);
    this._resetMsg();
  }

  new(){
    this.props.setTestingDay({});
    this._resetMsg();
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
        this._resetMsg();
        this.props.setTestingDay(testingDay);
        this.list(courseId, teacherId, courseTypeId, scheduleId);

        let toastrMsg = { success : 'Le jours d\'essaie à été crée.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.testingDaySection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de création.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
      });
  }


  // Read
  list(courseId, teacherId, courseTypeId, scheduleId){
    testingDayApi.list(courseId, teacherId, courseTypeId, scheduleId)
      .then( (testingDays) => {
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
        this._resetMsg();
        this.props.setTestingDay(testingDay);
        this.list(courseId, teacherId, courseTypeId, scheduleId);

        let toastrMsg = { success : 'Le jours d\'essaie à été crée.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.testingDaySection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de création.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
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
        this._resetMsg();
        this.props.setTestingDay({});
        this.list(courseId, teacherId, courseTypeId, scheduleId);

        let toastrMsg = { success : 'Le jours d\'essaie à été supprimer.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.testingDaySection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de supression.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
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

