"use strict";

// Vendor modules
import React                          from 'react';
import moment                         from 'moment';
import { Link }                       from "react-router";

import UserStore                      from '../stores/user/userStore';

// Project modules
import Footer                         from "../components/layout/Footer";
import Nav                            from "../components/layout/Nav";

// Vendor styles
import 'bootstrap/dist/css/bootstrap.css';

// Project styles
import './styles.scss';

export default class Layout extends React.Component {

  constructor() {
    super()
    this.state = {
      isLoggedIn: null,
      userName: null
    };
  }


  componentDidMount(){
    UserStore.addChangeListener(this.userStoreChangeListner.bind(this))
  }

  componentWillUnmount(){
    UserStore.removeChangeListener(this.userStoreChangeListner.bind(this))
  }

  userStoreChangeListner(){
    let newState = {};
    newState.isLoggedIn = UserStore.isLoggedIn();
    if(newState.isLoggedIn){
      newState.userName = UserStore.getUser().username;
    }
    this.setState(newState);
  }

  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px",
    };
    return (
      <div>
        <Nav
          location={location}
          isLoggedIn={this.state.isLoggedIn}
          userName={this.state.userName}
        />
        <div className="container" style={containerStyle}>
          {this.props.children}
          <Footer/>
        </div>
      </div>
    );
  }
}
