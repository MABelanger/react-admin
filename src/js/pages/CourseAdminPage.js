"use strict";
import React from "react";

import CourseAdmin from "../components/sections/course/admin";

export default class CourseAdminPage extends React.Component {
  render(){
    return (
      <div className="container">
        <div className="row text-center">
          <h3>Administration des cours</h3>
        </div>
        <CourseAdmin />
      </div>
    );
  }
}
