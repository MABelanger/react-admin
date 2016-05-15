"use strict";

import React                          from 'react';
import ReactMixin                     from 'react-mixin';
import Request                        from "superagent";

import TextInput                      from "../../commons/TextInput";
import * as sectionHelper             from "../helper";

// Flux User
import UserStore                      from '../../../stores/user/userStore';
import * as UserActions               from '../../../actions/user/userActions';
import UserConstants                  from '../../../constants/user/userConstants';

const CHANGE_EVENT = UserConstants.CHANGE_EVENT;

export default class Login extends React.Component {

  static contextTypes = { 
    router: React.PropTypes.object
  } 

  constructor() {
    super()
    this.state = {
      user: '',
      password: ''
    };
  }

  componentWillMount() {
    UserStore.on(CHANGE_EVENT, this.getUser.bind(this));
  }

  componentWillUnmount() {
    UserStore.removeListener(CHANGE_EVENT, this.getUser.bind(this));
  }

  changeValue(name, value) {
    let newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  getUser() {
    //let data = UserStore.getData();
    let user = UserStore.getUser();
    // redirect to admin/courses
    if(UserStore.isLoggedIn()){
      const { router } = this.context;
      router.push('/admin/courses');
    }
  }

  login(e) {
    e.preventDefault(); 
    UserActions.login(this.state.user, this.state.password);

    // TODO alert if no loged in
      // .catch(function(err) {
      //   alert("There's an error logging in");
      //   console.log("Error logging in", err);
      // });
  }

/*
          <div className="form-group">
            <label htmlFor="username">Username  gonto</label>
            <input type="text" valueLink={this.linkState('user')} className="form-control" id="username" placeholder="Username" />
          </div>
*/

  render() {
    return (
      <div className="login jumbotron center-block">
        <h1>Login</h1>
        <form role="form">

          <TextInput
            name="user"
            label="User"
            ref="user"
            error={sectionHelper.getError("user", this.props.errors)}
            value={this.state.name}
            changeValue={ (name, value) => { this.changeValue(name, value); } }
          />

          <TextInput
            name="password"
            label="Password"
            ref="password"
            error={sectionHelper.getError("password", this.props.errors)}
            value={this.state.name}
            changeValue={ (name, value) => { this.changeValue(name, value); } }
          />
          <button type="submit" className="btn btn-default" onClick={this.login.bind(this)}>Submit</button>
        </form>
      </div>
    );
  }
}
