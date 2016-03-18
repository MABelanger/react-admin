import React                      from "react";
import CourseNameSection          from "./components/sections/courseName";

var coursesApi =                  require("./api/coursesApi");



export default class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }

  fetchAllCourses(){
    coursesApi.getAllCourses(courses => {
      this.setState({'courses' : courses});
    });
  }

  componentWillMount() {
    this.fetchAllCourses();
  }

  render() {
    return (
      <div>
        <CourseNameSection
          courses={this.state.courses}
          onFetchAllCourses={this.fetchAllCourses.bind(this)}
        />
      </div>
    );
  }
}

