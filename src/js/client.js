"use strict";

// Vendor modules
import React                          from "react";
import ReactDOM                       from "react-dom";
import { createHistory, createHashHistory }              from 'history';
import { Router, Route, IndexRoute, Redirect,
  hashHistory, useRouterHistory }       from "react-router";

// Project modules
import Layout                         from './pages/Layout';
import ConferenceAdminPage            from './pages/ConferenceAdminPage';
import CourseAdminPage                from './pages/CourseAdminPage';
import LoginPage                      from './pages/LoginPage';
import LogoutPage                     from './pages/LogoutPage';

import * as Configs                    from "./configs/configs";

import UserStore                      from './stores/user/userStore';

const APP = document.getElementById('app');
let history = Configs.getHistory();


//let myHistory = useRouterHistory(createHashHistory)({ basename: '/' });

function requireAuth(nextState, replace) {
  if (!UserStore.isLoggedIn()) {
    replace({
      pathname: '/admin/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function onRouterUpdate(){
  window.scrollTo(0, 0)
}

ReactDOM.render(
  <Router 
    history={history}
    onUpdate={() => {onRouterUpdate();} }
  >
    <Redirect from="/" to="/admin/courses" />
    <Route  path="/"
            component={Layout}>

      <Route  path="admin/login"
              name="loginPage"
              component={LoginPage}>
      </Route>

      <Route  path="admin/logout"
              name="logoutPage"
              component={LogoutPage}>
      </Route>

      <Route  path="admin/courses"
              name="courseAdminPage"
              component={CourseAdminPage}
              onEnter={requireAuth}>
      </Route>

      <Route  path="admin/conferences"
              name="conferenceAdminPage"
              component={ConferenceAdminPage}
              onEnter={requireAuth}>
      </Route>
      <Redirect from="*" to="admin/courses" />
    </Route>
  </Router>,APP);
