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
let appHistory = Configs.getHistory();


//let myHistory = useRouterHistory(createHashHistory)({ basename: '/' });

function requireAuth(nextState, replace) {
  console.log('UserStore.isLoggedIn()', UserStore.isLoggedIn())
  if (!UserStore.isLoggedIn()) {
    replace({
      pathname: '/admin/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

ReactDOM.render(
  <Router history={appHistory}>
    <Route  path="/"
            component={Layout}>


      <Route  path="/admin/login"
              name="loginPage"
              component={LoginPage}>
      </Route>

      <Route  path="/admin/logout"
              name="logoutPage"
              component={LogoutPage}>
      </Route>

      <Route  path="/admin/courses"
              name="courseAdminPage"
              component={CourseAdminPage}
              onEnter={requireAuth}>
      </Route>

      <Route  path="/admin/conferences"
              name="conferenceAdminPage"
              component={ConferenceAdminPage}
              onEnter={requireAuth}>
      </Route>

    </Route>
  </Router>,APP);
