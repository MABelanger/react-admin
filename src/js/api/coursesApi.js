"use strict";
import _                          from 'lodash';
import Request                    from "superagent";

const URL = 'http://localhost:3000/api/courses';

// TODO : change this module to object and constructor... es6.

var _courses = [];

var setCourses = function(courses){
  _courses = courses;
}

var CourseApi = {

  /**
   * Create
   **/
  create: function(course) {
    var promise = new Promise(function(resolve, reject) {
      Request
        .post(URL)
        .accept('application/json')
        .type('application/json')
        .send(course)
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
  getAllCourses: function(callback) {
    Request
    .get(URL, function(err, res){
      callback(res.body);
    });
  },

  getCourseBySlug(slug){
    return _.find(_courses, {slug: slug});
  },

  getCourseById: function(id) {
    return _.find(_courses, {id: id});
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
  save: function(course) {
    var promise = new Promise(function(resolve, reject) {
      Request
        .put(URL + '/' + course._id)
        .accept('application/json')
        .type('application/json')
        .send(course)
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

  delete: function(course) {
    var promise = new Promise(function(resolve, reject) {
      Request
        .del(URL + '/' + course._id)
        .accept('application/json')
        .type('application/json')
        .send(course)
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

module.exports = CourseApi;