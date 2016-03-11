"use strict";

var React = require('react');


var Input = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    error: React.PropTypes.string
  },

  render: function () {
    var wrapperClass = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + 'has-error';
    }

    return (
      <div className="form-horizontal">
          <div className={wrapperClass}>
              <div className="col-xs-offset-2 col-xs-10">
                  <h4>Enseignants</h4>
                  <div className="btn-group">
                      <button type="button" className="btn dropdown-toggle btn-info" data-toggle="dropdown">
                          <span ng-show="teacher.id">
                              Danielle Fontaine
                          </span>

                          <span className="caret"></span>
                      </button>
                      <ul className="dropdown-menu" role="menu">
                          <li>
                              <a href="">
                                  Danielle Fontaine
                              </a>
                          </li>
                      </ul>
                  </div>
                
              </div>
          </div>
      </div>
    );
  }
});

module.exports = Input;