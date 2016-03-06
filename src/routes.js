"use strict";

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  <Route name="app" path="/" handler={require('./components/app')}>
    <DefaultRoute handler={require('./components/courses/manageCoursePage')} />
    <Route name="addCourse" path="course" handler={require('./components/courses/manageCoursePage')} />
    <Route name="manageCourse" path="course/:id" handler={require('./components/courses/manageCoursePage')} />
  </Route>
);

module.exports = routes;