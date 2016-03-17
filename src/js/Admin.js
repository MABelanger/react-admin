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

  _fetchAllCourses(){
    coursesApi.getAllCourses(courses => {
      this.setState({'courses' : courses});
    });
  }

  componentWillMount() {
    this._fetchAllCourses();
  }

  _onSaveDone(course){
    this.setState({'course': course});
    toastr.success('Course saved.');
  }

  onSave(course){
    coursesApi.saveCourse(course, (err, res) => {
      let course = res.body;
      this._onSaveDone(course);
    });
  }


  _onCreateDone(course){
    if(course._id){
      this.setState({'course': course});
      this.state.courses.push(course);
      this.setState({'courses' : this.state.courses});
      toastr.success('Course Created.');
    }
  }

  onCreate(course){
    coursesApi.createCourse(course, (err, res) => {
      let course = res.body;
      this._onCreateDone(course);
    });
  }

  onNew(){
    this.setState({'course': {}});
  }

  _onDeleteDone(){
    this.setState({'course': {}});
    this._fetchAllCourses();
  }

  onDelete(course){
    console.log('deleteCourse', this.state.course);
    coursesApi.deleteCourse(course, (err, res) => {
      this._onDeleteDone();
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

