"use strict";

var React = require('react');
var Input = require('../common/textInput');
var BtnDropdown = require('../common/btnDropdown');

var CourseForm = React.createClass({
	propTypes: {
		course:	React.PropTypes.object.isRequired,
		onSave:	React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},

	render: function() {
		return (
			<form>
				<h1>Manage Course</h1>
				<Input
					name="name"
					label="Nom"
					value={this.props.course.name}
					onChange={this.props.onChange}
					error={this.props.errors.name} />

				<input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />

				<BtnDropdown />
			</form>
		);
	}
});

module.exports = CourseForm;