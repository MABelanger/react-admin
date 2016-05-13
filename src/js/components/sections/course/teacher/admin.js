import React                      from "react";
import toastr                     from 'toastr';
import 'toastr/build/toastr.css';

import TeacherSection             from "./section";

// Flux Teacher
import TeacherStore                from '../../../../stores/course/teacherStore';
import * as TeacherActions         from '../../../../actions/course/teacherActions';
import TeacherConstants            from '../../../../constants/course/teacherConstants';



export default class TeacherAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toastrMsg: {},
      errors: {},
    };
  }

  componentWillMount() {
    TeacherStore.addSavedListener(this.onSaved.bind(this));
    TeacherStore.addDeletedListener(this.onDeleted.bind(this));
    TeacherStore.addErrorListener(this.onError.bind(this));
  }

  componentWillUnmount() {
    TeacherStore.removeSavedListener(this.onSaved.bind(this));
    TeacherStore.removeDeletedListener(this.onDeleted.bind(this));
    TeacherStore.removeErrorListener(this.onError.bind(this));
  }

  _resetMsg(){
    this.setState({
      toastrMsg: {},
      errors: {}
    });
  }

  select(teacher){
    this.props.setTeacher(teacher);
    this._resetMsg();
  }

  new(){
    this.props.setTeacher({});
    this._resetMsg();
  }

  /*
   * listener called by the store
   */

  onSaved(){
    this._resetMsg();
    let toastrMsg = { success : 'Le professeur à été sauvegardé.'};
    this.setState({ toastrMsg: toastrMsg });
    this.refs.teacherSection.hideSection();
  }

  onDeleted(){
    this._resetMsg();
    let toastrMsg = { success : 'Le professeur à été supprimé.'};
    this.setState({ toastrMsg: toastrMsg });
    this.refs.teacherSection.hideSection();
  }

  onError(){
    this._resetMsg();
    let errors = TeacherStore.getErrors();
    let toastrMsg = { error : "Erreur.<br/>"};
    this.setState({ errors: errors, toastrMsg: toastrMsg });
  }

  /**
   * CRUD Operations
   **/
  // Create
  create(teacher){
    TeacherActions.createTeacher(teacher, this.props.courseId);
  }

  // Read is admin by the parent component.

  // Update
  save(teacher){
    TeacherActions.saveTeacher(teacher, this.props.courseId);
  }

  // Delete
  delete(){
    TeacherActions.deleteTeacher(this.props.teacher, this.props.courseId);  
  }

  render() {
    return (
      <div>
        <TeacherSection
          ref="teacherSection"
          teachers={this.props.teachers}
          teacher={this.props.teacher}
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

