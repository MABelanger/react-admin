"use strict";

import Request                    from "superagent";


const URL = 'http://localhost:3000/api/';

// TODO : change this module to object and constructor... es6.


var TeacherApi = {

  /**
   * Create
   **/
  create: function(teacher, courseId) {
    var promise = new Promise(function(resolve, reject) {
      Request
        .post(URL + 'courses/' + courseId + '/teachers/')
        .accept('application/json')
        .type('application/json')
        .send(teacher)
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
   * Read
   **/

  getTeachers: function(courseId) {
    var promise = new Promise(function(resolve, reject) {
      Request
        .get(URL + 'courses/' + courseId + '/teachers/')
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

  getIndexById: function(objs, _id) {
    let index;
    for (let i=0; i < objs.length; i++) {
      if(_id == objs[i]._id){
        index = i; 
      }
    }
    return index;
  },

  /**
   * Update
   **/
  save: function(teacher) {
    var promise = new Promise(function(resolve, reject) {
      Request
        .put(URL + '/' + teacher._id)
        .accept('application/json')
        .type('application/json')
        .send(teacher)
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
   * Delete
   **/

  delete: function(teacher) {
    var promise = new Promise(function(resolve, reject) {
      Request
        .del(URL + '/' + teacher._id)
        .accept('application/json')
        .type('application/json')
        .send(teacher)
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

module.exports = TeacherApi;