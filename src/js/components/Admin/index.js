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
    this.setState({'teacher': {}});

    // update the teachers list and hide sections
    this.refs.teacherAdmin.list(course._id);
    this.refs.teacherAdmin.refs.teacherSection.hideSection();

  }


  /*
   * Teacher
   */
  setTeachers(teachers){
    this.setState({'teachers': teachers});
  }

  setTeacher(teacher){
    this.setState({'teacher': teacher});
  }


  render() {
    if (this.state.course._id) {
      var teacher = "";
    }

    return (
      <div>
        <CourseName
          course={this.state.course}
          courses={this.state.courses}
          setCourses={this.setCourses.bind(this)}
          setCourse={this.setCourse.bind(this)}
        />

        <Teacher
          ref="teacherAdmin"
          courseId={this.state.course._id}
          teacher={this.state.teacher}
          teachers={this.state.teachers}
          setTeachers={this.setTeachers.bind(this)}
          setTeacher={this.setTeacher.bind(this)}
        />

      </div>
    );
  }
}

