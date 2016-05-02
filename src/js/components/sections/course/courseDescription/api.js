"use strict";

import Request                    from "superagent";

import commonApi                  from "../commonApi";

const BASE_URL = 'http://localhost:3000/api/';

// TODO : change this module to object and constructor... es6.


function getUrl(courseId, teacherId){
  return BASE_URL + 'courses/' + courseId + '/teachers/' + teacherId + '/course_description'
}

var CourseDescriptionApi = {


  /**
   * Create
   **/

  create: function(courseId, teacherId, courseDescription) {
    let url = getUrl(courseId, teacherId);
    var promise = new Promise(function(resolve, reject) {
      Request
        .put(url)
        .accept('application/json')
        .type('application/json')
        .send(courseDescription)
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
  save: function(courseId, teacherId, courseDescription) {
    let url = getUrl(courseId, teacherId);
    var promise = new Promise(function(resolve, reject) {
      Request
        .put(url)
        .accept('application/json')
        .type('application/json')
        .send(courseDescription)
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

  delete: function(courseId, teacherId) {
    let url = getUrl(courseId, teacherId);
    var promise = new Promise(function(resolve, reject) {
      Request
        .del(url)
        .accept('application/json')
        .type('application/json')
        .send("")
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

module.exports = CourseDescriptionApi;