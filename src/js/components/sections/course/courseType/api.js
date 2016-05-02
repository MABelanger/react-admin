"use strict";

import Request                    from "superagent";

import commonApi                  from "../../commonApi";

const BASE_URL = 'http://localhost:3000/api/';

// TODO : change this module to object and constructor... es6.


function getUrl(courseId, teacherId){
  return BASE_URL + 'courses/' + courseId + '/teachers/' + teacherId + '/course_description/course_types'
}

var CourseTypeApi = {

  /**
   * Create
   **/
  create: function(courseId, teacherId, courseType) {
    let url = getUrl(courseId, teacherId);
    var promise = new Promise(function(resolve, reject) {
      Request
        .post(url)
        .accept('application/json')
        .type('application/json')
        .send(courseType)
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

  list: function(courseId, teacherId) {
    let url = getUrl(courseId, teacherId);
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

  read: function(courseId, teacherId) {
    let url = getUrl(courseId, teacherId);
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
  save: function(courseId, teacherId, courseType) {
    let url = getUrl(courseId, teacherId) + '/' + courseType._id;
    var promise = new Promise(function(resolve, reject) {
      Request
        .put(url)
        .accept('application/json')
        .type('application/json')
        .send(courseType)
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

  delete: function(courseId, teacherId, courseType) {
    let url = getUrl(courseId, teacherId) + '/' + courseType._id;
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

module.exports = CourseTypeApi;