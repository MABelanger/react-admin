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
  getAllCourses: function(callback) {
    Request
    .get(URL, function(err, res){
      callback(res.body);
    });
  },

  /*
  getMenuCourseNames(courses){
    for (var value of courses) {
      console.log(value);
    }
  },
  */

  getCourseBySlug(slug){
    return _.find(_courses, {slug: slug});
  },

  getCourseById: function(id) {
    return _.find(_courses, {id: id});
  },

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

  deleteCourse: function(course, callback){
    Request
      .del(URL + '/' + course._id)
      .accept('application/json')
      .type('application/json')
      .send(course)
      .end(callback);
  }
};

module.exports = CourseApi;