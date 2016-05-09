"use strict";

// Vendor modules
import Request                        from "superagent";

// Flux
import ClientDispatcher               from "../dispatcher/clientDispatcher";
import CourseNameConstants            from "../constants/courseNameConstants";
// Flux (to get token)
import UserStore                      from '../stores/userStore';

function getFlatErrors(errors){
  let flatErrors = {};
  for (var property in errors) {
    if (errors.hasOwnProperty(property)) {
      // 'teachers.1.firstName' -> 'firstName'
      let newProperty = property.split('.').splice(-1);
      flatErrors[newProperty] = errors[ property ];
    }
  }
  return flatErrors;
}


export function getCourseNames() {
  const URL = CourseNameConstants.URL;
  let token = UserStore.getToken();
  Request
  .get(URL)
  .set('Authorization', 'Bearer ' + token)
  .end(function(err, res){
    ClientDispatcher.dispatch({
      actionType: CourseNameConstants.LIST_COURSE_NAME_EVENT,
      courseNames: res.body
    });
  });
}

export function createCourseName(courseName) {
  const URL = CourseNameConstants.URL;
  let token = UserStore.getToken();
  Request
    .post(URL)
    .accept('application/json')
    .type('application/json')
    .send(courseName)
    .set('Authorization', 'Bearer ' + token)
    .end((err, res) => {
      if (! err ) {
        console.log(res.body);
        ClientDispatcher.dispatch({
          actionType: CourseNameConstants.CREATE_COURSE_NAME_EVENT,
          courseName: res.body
        });
        // trigger refresh all courseNames
        this.getCourseNames();
      }
      else {
        if(res) {
          console.log(getFlatErrors(res.body.errors));
        }
        reject(err);
      }
    });
}