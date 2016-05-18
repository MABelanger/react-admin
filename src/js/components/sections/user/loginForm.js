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

const {CHANGE_EVENT, ERROR_EVENT} = UserConstants;

export default class Login extends React.Component {

  static contextTypes = { 
    router: React.PropTypes.object
  } 

  constructor() {
    super()
    this.state = {
      user: '',
      password: '',
      errors: ''
    };
  }

  componentWillMount() {
    UserStore.on(CHANGE_EVENT, this.getUser.bind(this));
    UserStore.on(ERROR_EVENT, this.errorUser.bind(this));
  }

  componentWillUnmount() {
    UserStore.removeListener(CHANGE_EVENT, this.getUser.bind(this));
    UserStore.removeListener(ERROR_EVENT, this.errorUser.bind(this));
  }

  changeValue(name, value) {
    let newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  errorUser(){
    let data = UserStore.getData();
    if(data.hasError){
      this.setState({
        errors: data.errors
      });
    }
    console.log('data', data)
  }

  getUser() {
    console.log('getUser');
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
      <div>
        <div className="row">
          <div className="col-sm-offset-2 col-sm-10">
            <h1>Connection</h1>
          </div>
        </div>
          <div className="row">
            <form role="form">

              <TextInput
                name="user"
                label="Utilisateur"
                ref="user"
                error={sectionHelper.getError("user", this.state.errors)}
                value={this.state.name}
                changeValue={ (name, value) => { this.changeValue(name, value); } }
              />

              <TextInput
                name="password"
                label="Mot de passe"
                ref="password"
                error={sectionHelper.getError("password", this.state.errors)}
                value={this.state.name}
                changeValue={ (name, value) => { this.changeValue(name, value); } }
              />

            <div className="form-horizontal">
              <div className="form-group no-margin">
                <div className="col-sm-offset-2 col-sm-3">
                  <button type="submit" className="btn btn-default" onClick={this.login.bind(this)}>Connection</button>
                </div>
              </div>
            </div>

            </form>
          </div>

        </div>

    );
  }
}
