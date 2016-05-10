"use strict";

// Vendor modules
import Request                        from "superagent";

// Flux
import ClientDispatcher               from "../dispatcher/clientDispatcher";
import CourseDescriptionConstants     from "../constants/courseDescriptionConstants";
// Flux (to get token)
import UserStore                      from '../stores/userStore';

const { BASE_URL,
        GET_COURSE_DESCRIPTION_EVENT,
        CREATE_COURSE_DESCRIPTION_EVENT,
        SAVED_COURSE_DESCRIPTION_EVENT,
        READ_COURSE_DESCRIPTION_EVENT,
        SAVE_COURSE_DESCRIPTION_EVENT,
        DELETE_COURSE_DESCRIPTION_EVENT,
        ERROR_SAVE_COURSE_DESCRIPTION_EVENT,
        ERROR_DELETE_COURSE_DESCRIPTION_EVENT } = CourseDescriptionConstants;


console.log('SAVE_COURSE_DESCRIPTION_EVENT', SAVE_COURSE_DESCRIPTION_EVENT)

function getFlatErrors(errors){
  let flatErrors = {};
  for (var property in errors) {
    if (errors.hasOwnProperty(property)) {
      // 'courseDescriptions.1.firstName' -> 'firstName'
      let newProperty = property.split('.').splice(-1);
      flatErrors[newProperty] = errors[ property ];
    }
  }
  return flatErrors;
}

function getUrl(courseId, teacherId){
  return BASE_URL + 'courses/' + courseId + '/teachers/' + teacherId + '/course_description'
}

export function getCourseDescription(courseId, teacherId) {
  console.log('courseId', courseId);
  console.log('teacherId', teacherId);
  let url = getUrl(courseId, teacherId);
  let token = UserStore.getToken();
  Request
  .get(url)
  .set('Authorization', 'Bearer ' + token)
  .end(function(err, res){
    ClientDispatcher.dispatch({
      actionType: GET_COURSE_DESCRIPTION_EVENT,
      courseDescription: res.body
    });
  });
}

export function createCourseDescription(courseDescription, courseId, teacherId) {
  let url = getUrl(courseId, teacherId);
  let token = UserStore.getToken();
  Request
    .post(url)
    .accept('application/json')
    .type('application/json')
    .send(courseDescription)
    .set('Authorization', 'Bearer ' + token)
    .end((err, res) => {
      if (! err ) {
        ClientDispatcher.dispatch({
          actionType: CREATE_COURSE_DESCRIPTION_EVENT,
          courseDescription: res.body
        });
        // trigger refresh all courseDescriptions
        //this.getCourseDescription(courseId, teacherId);
      }
      else {
        if(res) {
          ClientDispatcher.dispatch({
            actionType: ERROR_SAVE_COURSE_DESCRIPTION_EVENT,
            errors: getFlatErrors(res.body.errors)
          });
        }
        // TODO error connection
        // ClientDispatcher.dispatch({
        //   actionType: ERROR_CONNECTION,
        //   errors: err
        // });
      }
    });
}

export function saveCourseDescription(courseDescription, courseId, teacherId) {
  let url = getUrl(courseId, teacherId);
  let token = UserStore.getToken();
  Request
    .put(url)
    .accept('application/json')
    .type('application/json')
    .send(courseDescription)
    .set('Authorization', 'Bearer ' + token)
    .end((err, res) => {
      if (! err ) {
        console.log('SAVE_COURSE_DESCRIPTION_EVENT', SAVE_COURSE_DESCRIPTION_EVENT)
        ClientDispatcher.dispatch({
          actionType: SAVE_COURSE_DESCRIPTION_EVENT,
          courseDescription: res.body
        });
        // trigger refresh all courseDescriptions
        //this.getCourseDescription(courseId, teacherId);
      }
      else {
        if(res) {
          ClientDispatcher.dispatch({
            actionType: ERROR_SAVE_COURSE_DESCRIPTION_EVENT,
            errors: getFlatErrors(res.body.errors)
          });
        }
        // TODO error connection
        // ClientDispatcher.dispatch({
        //   actionType: ERROR_CONNECTION,
        //   errors: err
        // });
      }
    });
}

export function deleteCourseDescription(courseDescription, courseId, teacherId) {
  let url = getUrl(courseId, teacherId);
  let token = UserStore.getToken();
  Request
    .del(url)
    .accept('application/json')
    .type('application/json')
    .set('Authorization', 'Bearer ' + token)
    .end((err, res) => {
      if (! err ) {
        ClientDispatcher.dispatch({
          actionType: DELETE_COURSE_DESCRIPTION_EVENT,
          courseDescription: res.body
        });
        // trigger refresh all courseDescriptions
        //this.getCourseDescription(courseId, teacherId);
      }
      else {
        if(res) {
          ClientDispatcher.dispatch({
            actionType: ERROR_DELETE_COURSE_DESCRIPTION_EVENT,
            errors: getFlatErrors(res.body.errors)
          });
        }
        // TODO error connection
        // ClientDispatcher.dispatch({
        //   actionType: ERROR_CONNECTION,
        //   errors: err
        // });
      }
    });
}

