import React                          from "react";
import toastr                         from 'toastr';

import CourseNameSection              from "./section";

import * as sectionHelper             from "../../helper";

// Flux CourseName
import CourseNameStore                from '../../../../stores/course/courseNameStore';
import * as CourseNameActions         from '../../../../actions/course/courseNameActions';
import CourseNameConstants            from '../../../../constants/course/courseNameConstants';

// CSS
import 'toastr/build/toastr.css';

const COURSE_NAME_LISTNER_FCT_NAMES = [
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

export default class CourseNameAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.courseNameListnerFctRemoveNames = null;
    this.state = {
      toastrMsg: {},
      errors: {},
    };
  }

  componentWillMount() {
    this.mounted = true;

    // CourseName
    this.courseNameListnerFctRemoveNames = 
      sectionHelper.addListeners(CourseNameStore, COURSE_NAME_LISTNER_FCT_NAMES, this);
  }

  componentWillUnmount() {
    this.mounted = false;

    // CourseName
    sectionHelper.removeListeners(CourseNameStore, this.courseNameListnerFctRemoveNames);
  }