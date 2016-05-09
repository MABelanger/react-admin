"use strict";

// Vendor modules
import Request                        from "superagent";

// Project modules
import ClientDispatcher               from "../dispatcher/clientDispatcher";
import CourseNameConstants            from "../constants/courseNameConstants";

import UserStore                      from '../stores/userStore';


export function getCourseNames() {
  const URL = CourseNameConstants.URL;
  let token = UserStore.getToken();
  console.log('URL', URL);
  Request
  .get(URL)
  .set('Authorization', 'Bearer ' + token)
  .end(function(err, res){
    ClientDispatcher.dispatch({
      actionType: CourseNameConstants.LIST_EVENT,
      courseNames: res.body
    });
  });
}