import React from 'react/addons';

import ReactMixin from 'react-mixin'


// Flux User
import UserStore               from '../../stores/userStore';
import * as UserActions        from '../../actions/userActions';
import UserConstants           from '../../constants/userConstants';

const CHANGE_EVENT = UserConstants.CHANGE_EVENT;

export default class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      user: '',
      password: ''
    };
  }

  componentWillMount() {
    UserStore.on(CHANGE_EVENT, this.getUser);
  }

  componentWillUnmount() {
    UserStore.removeListener(CHANGE_EVENT, this.getUser);
  }

  getUser() {
    //let data = UserStore.getData();
    let user = UserStore.getUser();

    console.log('user', user);
  }

  login(e) {
    e.preventDefault();
    UserActions.login(this.state.user, this.state.password);
      // .catch(function(err) {
      //   alert("There's an error logging in");
      //   console.log("Error logging in", err);
      // });
  }

  render() {
    return (
      <div className="login jumbotron center-block">
        <h1>Login</h1>
        <form role="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" valueLink={this.linkState('user')} className="form-control" id="username" placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" valueLink={this.linkState('password')} className="form-control" id="password" ref="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-default" onClick={this.login.bind(this)}>Submit</button>
      </form>
    </div>
    );
  }
}

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);