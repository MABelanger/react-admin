"use strict";
import React from "react";

//import Admin from "./components/sections/course/admin";
import CourseAdminPage from "../components/sections/course/admin";

export default class CourseAdminPagePage extends React.Component {
  render(){
    return (
      <div className="container">
        <CourseAdminPage />
      </div>
    );
  }
}