import React                      from 'react/addons';
import ReactMixin                 from 'react-mixin';
import Request                    from "superagent";


// Flux User
import UserStore                   from '../../stores/user/userStore';
import * as UserActions            from '../../actions/user/userActions';
import UserConstants               from '../../constants/user/userConstants';

// Flux CourseName
import CourseNameStore             from '../../stores/course/courseNameStore';
import * as CourseNameActions      from '../../actions/course/courseNameActions';
import CourseNameConstants         from '../../constants/course/courseNameConstants';

// Add bearer to superagent prototype
require('superagent-auth-bearer')(Request);

const CHANGE_EVENT = UserConstants.CHANGE_EVENT;
const LIST_EVENT = CourseNameConstants.LIST_EVENT;

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
    UserStore.on(LIST_EVENT, this.printCourseNames);
  }

  componentWillUnmount() {
    UserStore.removeListener(CHANGE_EVENT, this.getUser);
    UserStore.removeListener(LIST_EVENT, this.printCourseNames);
  }

  getUser() {
    //let data = UserStore.getData();
    let user = UserStore.getUser();

    // action the courseNames
    CourseNameActions.getCourseNames();
  }

  printCourseNames(){
    console.log('CourseNameStore.getCourseNames()', CourseNameStore.getCourseNames())
  }

  login(e) {
    e.preventDefault();
    UserActions.login(this.state.user, this.state.password);
      // .catch(function(err) {
      //   alert("There's an error logging in");
      //   console.log("Error logging in", err);
      // });
  }

  getSecureData(){
//.set('Authorization', `bearer ${JWT_KEY}`)
    let token = UserStore.getToken();
    console.log('token', token)
    Request
      .get('http://localhost:3000/api/sessions/private')
      .accept('application/json')
      .type('application/json')
      .authBearer(token)
      .end((err, res) => {
        console.log('res', res);
      });
  }

  render() {
    return (
      <div className="login jumbotron center-block">
        <h1>Login</h1>
        <form role="form">
        <div className="form-group">
          <label htmlFor="username">Username  gonto</label>
          <input type="text" valueLink={this.linkState('user')} className="form-control" id="username" placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" valueLink={this.linkState('password')} className="form-control" id="password" ref="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-default" onClick={this.login.bind(this)}>Submit</button>
      </form>
      <button className="btn btn-default" onClick={this.getSecureData.bind(this)}>getSecureData</button>
    </div>
    );
  }
}

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);