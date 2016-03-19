import React                      from "react";
import CourseNameSection          from "./components/sections/courseName";
import TeacherSection             from "./components/sections/teacher";


import * as sectionHelper         from "./components/sections/helper";

var coursesApi =                  require("./api/coursesApi");

export default class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      course: {}
    };
    //sectionHelper.fetchAllCourses(this);
  }


  fetchAllCourses(){
    coursesApi.getAllCourses(courses => {
      this.setState({'courses' : courses});
    });
  }


  componentWillMount() {
    this.fetchAllCourses();
  }

  select(course){
    this.setState({course: course});
  }

  render() {
    return (
      <div>
        <CourseNameSection
          courses={this.state.courses}
          onFetchAllCourses={this.fetchAllCourses.bind(this)}
          onSelect={this.select.bind(this)}
        />
        <TeacherSection teachers={this.state.course.teachers}/>
      </div>
    );
  }
}

