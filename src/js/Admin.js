import React                      from "react";
import CourseNameSection          from "./components/sections/CourseNameSection";
import toastr                     from 'toastr';
import 'toastr/build/toastr.css';
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

  onSave(course){
    console.log('saveCourse', course);
    coursesApi.saveCourse(course, (err, res) => {
      console.log('err, res', err, res);
      this.setState({'course': course});
      toastr.success('Course saved.');
    });
  }

  onCreate(course){
    console.log('createCourse', course);
    coursesApi.createCourse(course, (err, res) => {
      let course = res.body;
      if(course._id){
        this.setState({'course': course});
        this.state.courses.push(course);
        this.setState({'courses' : this.state.courses});
        toastr.success('Course Created.');
      }
    });
  }

  onNew(){
    this.setState({'course': {}});
  }

  onDelete(course){
    console.log('deleteCourse', this.state.course);
    coursesApi.deleteCourse(course, (err, res) => {
      console.log('err, res', err, res)
      this.setState({'course': {}});
      coursesApi.getAllCourses(courses => {
        this.setState({'courses' : courses});
      });
    });
  }

  onSelect(course){
    this.setState({course: course});
  }

  render() {
    return (
      <div>
        <CourseNameSection
          courses={this.state.courses}
          course={this.state.course}
          onSave={this.onSave.bind(this)}
          onCreate={this.onCreate.bind(this)}
          onDelete={this.onDelete.bind(this)}
          onSelect={this.onSelect.bind(this)}
          onNew={this.onNew.bind(this)}
        />
      </div>
    );
  }
}

