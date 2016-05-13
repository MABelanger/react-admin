import React                          from "react";
import toastr                         from 'toastr';

import TeacherSection              from "./section";

import * as sectionHelper             from "../../helper";

// Flux Teacher
import TeacherStore                from '../../../../stores/course/teacherStore';
import * as TeacherActions         from '../../../../actions/course/teacherActions';
import TeacherConstants            from '../../../../constants/course/teacherConstants';

// CSS
import 'toastr/build/toastr.css';

const TEACHER_LISTNER_FCT_NAMES = [
  { 
    storeFctAdd:'addSavedListener',
    storeFctRemove:'removeSavedListener',
    listenerFct: 'onSaved'
  },
  {
    storeFctAdd:'addDeletedListener',
    storeFctRemove:'removeDeletedListener',
    listenerFct: 'onDeleted'
  },
  { 
    storeFctAdd:'addErrorListener',
    storeFctRemove:'removeErrorListener',
    listenerFct: 'onError'
  }
];

export default class TeacherAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.teacherListnerFctRemoveNames = null;
    this.state = {
      toastrMsg: {},
      errors: {},
    };
  }

  componentWillMount() {
    this.mounted = true;

    // Teacher
    this.teacherListnerFctRemoveNames = 
      sectionHelper.addListeners(TeacherStore, TEACHER_LISTNER_FCT_NAMES, this);
  }

  componentWillUnmount() {
    this.mounted = false;

    // Teacher
    sectionHelper.removeListeners(TeacherStore, this.teacherListnerFctRemoveNames);
  }