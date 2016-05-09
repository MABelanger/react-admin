"use strict";

// Vendor modules
import Request                        from "superagent";

// Project modules
import ClientDispatcher               from "../dispatcher/clientDispatcher";
import userConstants                  from "../constants/userConstants";

// login('gonto', 'gonto');
export function login(username, password){
  let data = {
    username: username,
    password: password
  }
  console.log('userConstants.LOGIN_URL', userConstants.LOGIN_URL)
  Request
    .post(userConstants.LOGIN_URL)
    .accept('application/json')
    .type('application/json')
    .send(data)
    .end((err, res) => {
      ClientDispatcher.dispatch({
        actionType: userConstants.DONE_LOGIN,
        data: res.body
      });
    });
}

