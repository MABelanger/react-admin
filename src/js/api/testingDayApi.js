"use strict";

import Request                    from "superagent";

import commonApi                  from "./commonApi";

const BASE_URL = 'http://localhost:3000/api/';

// TODO : change this module to object and constructor... es6.


function getUrl(courseId, teacherId, courseTypeId, scheduleId){
  return BASE_URL + 'courses/' + courseId 
                  + '/teachers/' + teacherId 
                  + '/course_description/course_types/' + courseTypeId
                  + '/schedules/' + scheduleId
                  + '/testing_days';
}

var TestingDayApi = {

  /**
   * Create
   **/
  create: function(courseId, teacherId, courseTypeId, scheduleId, testingDay) {
    let url = getUrl(courseId, teacherId, courseTypeId, scheduleId);
    var promise = new Promise(function(resolve, reject) {
      Request
        .post(url)
        .accept('application/json')
        .type('application/json')
        .send(testingDay)
        .end((err, res) => {
          if (! err ) {
            resolve(res.body);
          }
          else {
            if(res) {
              reject(commonApi.getFlatErrors(res.body.errors));
            }
            reject(err);
          }
        });
    });
    return promise;
  },

  /**
   * Read
   **/

  list: function(courseId, teacherId, courseTypeId, scheduleId) {
    let url = getUrl(courseId, teacherId, courseTypeId, scheduleId);
    var promise = new Promise(function(resolve, reject) {
      Request
        .get(url)
        .accept('application/json')
        .type('application/json')
        .end((err, res) => {
          if (! err ) {
            resolve(res.body);
          }
          else {
            reject(err);
          }
        });
    });
    return promise;
  },

  /**
   * Update
   **/
  save: function(courseId, teacherId, courseTypeId, scheduleId, testingDay) {
    let url = getUrl(courseId, teacherId, courseTypeId, scheduleId) + '/' + testingDay._id;
    var promise = new Promise(function(resolve, reject) {
      Request
        .put(url)
        .accept('application/json')
        .type('application/json')
        .send(testingDay)
        .end((err, res) => {
          if (! err ) {
            resolve(res.body);
          }
          else {
            if(res) {
              reject(commonApi.getFlatErrors(res.body.errors));
            }
            reject(err);
          }
        });
    });
    return promise;
  },

  /**
   * Delete
   **/

  delete: function(courseId, teacherId, courseTypeId, scheduleId, testingDay) {
    let url = getUrl(courseId, teacherId, courseTypeId, scheduleId) + '/' + testingDay._id;
    var promise = new Promise(function(resolve, reject) {
      Request
        .del(url)
        .accept('application/json')
        .type('application/json')
        .end((err, res) => {
          if (! err ) {
            resolve(res.body);
          }
          else {
            reject(err);
          }
        });
    });
    return promise;
  }
};

module.exports = TestingDayApi;