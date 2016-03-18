import React                      from "react";
import CourseNameSection          from "./components/sections/courseName";
//import ToastrAlert                from "./components/ToastrAlert";

var coursesApi =                  require("./api/coursesApi");

// Styles
import 'toastr/build/toastr.css';


export default class Admin extends React.Component {

/*
  course={this.state.course}
  onSave={this.onSave.bind(this)}
  onCreate={this.onCreate.bind(this)}
  onDelete={this.onDeleteYes.bind(this)}
  onSelect={this.onSelect.bind(this)}
  onNew={this.onNew.bind(this)}
*/

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

