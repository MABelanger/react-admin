var coursesApi =                  require("../../api/coursesApi");
import React                      from "react";
import CourseName                 from "./CourseName";
import Teacher                    from "./Teacher";

export default class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courses : [],
      course : {},

      teachers: [],
      teacher : {}
    };
  }


  /*
   * Course
   */
  setCourses(courses){
    this.setState({'courses': courses});
  }

  setCourse(course){
    this.setState({'course': course});
  }


  /*
   * Teacher
   */
  setTeachers(teachers){
    console.log('teachers', teachers)
    this.setState({'teachers': teachers});
  }

  setTeacher(teacher){
    this.setState({'teacher': teacher});
  }

  render() {
    return (
      <div>
        <CourseName
          course={this.state.course}
          courses={this.state.courses}
          setCourses={this.setCourses.bind(this)}
          setCourse={this.setCourse.bind(this)}
        />

        <Teacher
          teacher={this.state.teacher}
          teachers={this.state.teachers}
          setTeachers={this.setTeachers.bind(this)}
          setTeacher={this.setTeacher.bind(this)}
        />
      </div>
    );
  }
}

