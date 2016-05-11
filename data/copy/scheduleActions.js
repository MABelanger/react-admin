"use strict";

// Vendor modules
import Request                        from "superagent";

// Flux
import ClientDispatcher               from "../../dispatcher/clientDispatcher";
import ScheduleConstants              from "../../constants/course/scheduleConstants";
// Flux (to get token)
import UserStore                      from '../../stores/user/userStore';

const { URL,
        LIST_SCHEDULE_EVENT,
        CREATE_SCHEDULE_EVENT,
        SAVED_SCHEDULE_EVENT,
        READ_SCHEDULE_EVENT,
        SAVE_SCHEDULE_EVENT,
        DELETE_SCHEDULE_EVENT,
        ERROR_SAVE_SCHEDULE_EVENT,
        ERROR_DELETE_SCHEDULE_EVENT } = ScheduleConstants;


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


export function getSchedules() {
  let token = UserStore.getToken();
  Request
  .get(URL)
  .set('Authorization', 'Bearer ' + token)
  .end(function(err, res){
    ClientDispatcher.dispatch({
      actionType: LIST_SCHEDULE_EVENT,
      schedules: res.body
    });
  });
}

export function createSchedule(schedule) {
  let token = UserStore.getToken();
  Request
    .post(URL)
    .accept('application/json')
    .type('application/json')
    .send(schedule)
    .set('Authorization', 'Bearer ' + token)
    .end((err, res) => {
      if (! err ) {
        ClientDispatcher.dispatch({
          actionType: CREATE_SCHEDULE_EVENT,
          schedule: res.body
        });
        // trigger refresh all schedules
        this.getSchedules();
      }
      else {
        if(res) {
          ClientDispatcher.dispatch({
            actionType: ERROR_SAVE_SCHEDULE_EVENT,
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

export function saveSchedule(schedule) {
  let token = UserStore.getToken();
  let url = URL + '/' + schedule._id;
  Request
    .put(url)
    .accept('application/json')
    .type('application/json')
    .send(schedule)
    .set('Authorization', 'Bearer ' + token)
    .end((err, res) => {
      if (! err ) {
        ClientDispatcher.dispatch({
          actionType: SAVE_SCHEDULE_EVENT,
          schedule: res.body
        });
        // trigger refresh all schedules
        this.getSchedules();
      }
      else {
        if(res) {
          ClientDispatcher.dispatch({
            actionType: ERROR_SAVE_SCHEDULE_EVENT,
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

export function deleteSchedule(schedule) {
  let token = UserStore.getToken();
  let url = URL + '/' + schedule._id;
  Request
    .del(url)
    .accept('application/json')
    .type('application/json')
    .set('Authorization', 'Bearer ' + token)
    .end((err, res) => {
      if (! err ) {
        ClientDispatcher.dispatch({
          actionType: DELETE_SCHEDULE_EVENT,
          schedule: res.body
        });
        // trigger refresh all schedules
        this.getSchedules();
      }
      else {
        if(res) {
          ClientDispatcher.dispatch({
            actionType: ERROR_DELETE_SCHEDULE_EVENT,
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

