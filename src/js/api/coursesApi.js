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
  
  saveCourse: function(course, callback) {
    request
      .post(URL + '/' + course._id)
      .send(course)
      .set('Accept', 'application/json')
      .end(callback(err, res));
  },

  deleteCourse: function(id) {
    console.log('Pretend this just deleted the course from the DB via an AJAX call...');
  }
};

module.exports = CourseApi;