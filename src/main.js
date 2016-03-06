/*
"use strict";
//$ = jQuery = require('jquery');

var React = require('react');
var ManageCoursePage = require('./components/courses/ManageCoursePage');
React.render(<ManageCoursePage />, document.getElementById('app'));
*/

"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
