import React                      from "react";
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
      list: list
    };
  }

  componentWillMount() {
    coursesApi.getAllCourses(courses => {
      this.setState({'courses' : courses});
    });
  }



  saveCourseNameSection(course){
    console.log('saveCourse', course);
    coursesApi.saveCourse(course, function(err, res) {
      console.log('err, res', err, res)
    });
  }

  render() {
    return (
      <div>
        <CourseNameSection
          courses={this.state.courses}
          save={this.saveCourseNameSection}
        />
      </div>
    );
  }
}

