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

  getMenuCourseNames(courses){
    for (var value of courses) {
      console.log(value);
    }
  },

  getCourseBySlug(slug){
    return _.find(_courses, {slug: slug});
  },

  getCourseById: function(id) {
    return _.find(_courses, {id: id});
  },
  
  saveCourse: function(course) {
    //pretend an ajax call to web api is made here
    console.log('Pretend this just saved the course to the DB via AJAX call...');
    
    //Just simulating creation here.
    //The server would generate ids for new courses in a real app.
    if (!course.id) {
      course.id = _generateId(course);
      courses.push(course);
    }

    return course;
  },

  deleteCourse: function(id) {
    console.log('Pretend this just deleted the course from the DB via an AJAX call...');
  }
};

module.exports = CourseApi;