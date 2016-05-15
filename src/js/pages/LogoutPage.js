"use strict";
import React                          from "react";

import * as UserActions               from '../actions/user/userActions';

export default class LogoutPage extends React.Component {

  componentWillMount(){
    console.log('UserActions', UserActions);
    UserActions.logout();
  }
  render(){
    return (
      <div className="container">
        Vous avez été déconnecté avec succès !
      </div>
    );
  }
}