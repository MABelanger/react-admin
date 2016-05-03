"use strict";
import React from "react";

//import Admin from "./components/sections/course/admin";
import ConferenceAdmin from "../components/sections/conference/admin";

export default class ConferenceAdminPage extends React.Component {
  render(){
    return (
      <div className="container">
        <ConferenceAdmin />
      </div>
    );
  }
}