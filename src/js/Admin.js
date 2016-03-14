import React                      from "react";
import Request                    from "superagent";


import TextInput                  from "./components/commons/TextInput";
import SectionTop                 from "./components/commons/sectionTop/SectionTop";
import CourseNameSection          from "./components/sections/CourseNameSection";
var coursesApi =                  require("./api/coursesApi");

var list = [
  {
    name : "yoga",
    link : "#yoga"
  },
  {
    name : "meditation",
    link : "#meditation"
  }
];


export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      course: {},
      list:list
    };
  }

  componentWillMount() {
    coursesApi.getAllCourses(courses => {
      this.setState({'courses' : courses});
    });
  }

  render() {
    return (
      <div>
        <CourseNameSection courses={this.state.courses} />
      </div>
    );
  }
}

