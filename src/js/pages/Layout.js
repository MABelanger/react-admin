"use strict";

// Vendor modules
import React                          from 'react';
import moment                         from 'moment';
import { Link }                       from "react-router";

import UserStore                      from '../stores/user/userStore';

// Project modules
import Footer                         from "../components/layout/Footer";
import Nav                            from "../components/layout/Nav";

// Project styles
import './styles.scss';

export default class Layout extends React.Component {
  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px",
    };
    return (
      <div>
        <Nav
          location={location}
          isLoggedIn={UserStore.isLoggedIn()}
        />
        <div className="container" style={containerStyle}>
          {this.props.children}
          <Footer/>
        </div>
      </div>
    );
  }
}
