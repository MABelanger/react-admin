"use strict";

// Vendor modules
import React                          from "react";
import { IndexLink, Link }            from "react-router";

import UserStore                      from '../../stores/user/userStore';

import './nav.scss';

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const courseAdminClass = (location.pathname === "/admin/courses" || location.pathname === "/") ? "active" : "";
    const conferenceAdminClass = location.pathname === "/admin/conferences" ? "active" : "";
    const loginClass = location.pathname === "/admin/login" ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (
      <nav className="navbar navbar-default navbar-inner navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li>
                <a href="http://www.mondeavie.ca" onClick={this.toggleCollapse.bind(this)}>
                  <span dangerouslySetInnerHTML={{__html: " &lt; RETOUR AU SITE" }}></span>
                </a>
              </li>
              <li className={courseAdminClass}>
                <IndexLink to="/admin/courses" onClick={this.toggleCollapse.bind(this)}>CALENDRIER DES COURS</IndexLink>
              </li>
              <li className={conferenceAdminClass}>
                <Link to="/admin/conferences" onClick={this.toggleCollapse.bind(this)}>CONFÉRENCES ET ATELIERS</Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className={loginClass}>
                {UserStore.isLoggedIn() ? (
                  <Link to="/admin/logout" onClick={this.toggleCollapse.bind(this)}>DÉCONNECTION ({UserStore.getUser()})</Link>
                ) : (
                  <Link to="/admin/login" onClick={this.toggleCollapse.bind(this)}>CONNECTION</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}