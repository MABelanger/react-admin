"use strict";

//This file is mocking a web API by hitting hard coded data.
var courses = require('./courseData').courses;
var _ = require('lodash');

//This would be performed on the server in a real app. Just stubbing in.
var _generateId = function(course) {
	return course.firstName.toLowerCase() + '-' + course.lastName.toLowerCase();
};

var CourseApi = {
	getAllCourses: function() {
		return courses;
	},

	getCourseById: function(id) {
		return _.find(courses, {id: id});
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