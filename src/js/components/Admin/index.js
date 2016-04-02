var coursesApi =                  require("../../api/coursesApi");
import React                      from "react";
import CourseName                 from "./CourseName";
import Teacher                    from "./Teacher";
import CourseDescription          from "./CourseDescription";
import CourseType                 from "./CourseType";
import Schedule                   from "./Schedule";
import moment                     from "moment";
import BtnInfo                    from "../commons/BtnInfo";


export default class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courses : [],
      course : {},

      teachers: [],
      teacher : {},

      courseDescription: {},

      courseTypes: [],
      courseType : {},

      schedules: [],
      schedule : {},

    };
    //http://localhost:3000/api/courses/
    // 56fd65bd884902915a0805ea/teachers/56fd65ce884902915a0805eb/course_description/course_types/56fd6659884902915a0805ec/schedules
    // force schedule


    /*
    console.log(moment().startOf('day').utcOffset("-04:00").toISOString());
    console.log(moment("2016-03-18T20:28:00.000Z").toISOString());
    console.log(moment("2016-03-18T20:28:00.000Z").utcOffset( moment().utcOffset() ).toString());
    console.log(moment("2016-03-18T20:28:00.000Z").toString());

    let isoDate = moment("2016-03-18T20:28:00.000Z").utcOffset("-04:00").toISOString();
    console.log('isoDate', isoDate);

    let utcDate = moment("2016-03-18T20:28:00.000Z").utc().format();
    console.log('utcDate', utcDate);
    */
  }


  forceState(){
    let course = {
      _id : '56fd65bd884902915a0805ea'
    };
    let teacher = {
      _id : '56fd65ce884902915a0805eb'
    };

    let courseType = {
      _id : '56fd6659884902915a0805ec'
    }

    let schedule = {
      _id : '56fd874bb8fbe2c25b6d2fe1'
    }

    this.setState({
      course : course,
      teacher : teacher,
      courseType : courseType,
      schedule: schedule
    });
  }

  /*
   * Course
   */
  setCourses(courses){
    this.setState({'courses': courses});
  }

  componentDidMount(){

  }

  setCourse(course){
    this.setState({'course': course});
    this._resetTeachers();
  }


  /*
   * Teacher
   */
  _resetTeachers(){
    this.setState({'teacher': {}});
    // update the teachers list and hide sections
    // need an if because the component is not
    if(this.refs.teacherAdmin){
      this.refs.teacherAdmin.list(this.state.course._id);
      this.refs.teacherAdmin.refs.teacherSection.hideSection();
    }
  }

  setTeachers(teachers){
    this.setState({'teachers': teachers});
  }



  setTeacher(teacher){
    this.setState({'teacher': teacher});
    this._resetCourseDescription();
    this._resetCourseType();
  }

  getTeacher(){
    return (
      <Teacher
        ref="teacherAdmin"
        courseId={this.state.course._id}
        teacher={this.state.teacher}
        teachers={this.state.teachers}
        setTeachers={this.setTeachers.bind(this)}
        setTeacher={this.setTeacher.bind(this)}
      />
    );
  }

  /*
   * CourseDescription
   */
  _resetCourseDescription() {
    // update the course description and hide sections
    // need an if because the component is not
    if ( this.refs.courseDescriptionAdmin ) {
      this.refs.courseDescriptionAdmin.update( this.state.course._id, this.state.teacher._id );
      this.refs.courseDescriptionAdmin.refs.courseDescriptionSection.hideSection();
    }
  }
  setCourseDescription(courseDescription) {
    this.setState({'courseDescription': courseDescription});
  }

  getCourseDescription(){
    return (
      <CourseDescription
        ref="courseDescriptionAdmin"
        courseDescription={ this.state.courseDescription }
        setCourseDescription={this.setCourseDescription.bind(this)}
        courseId={this.state.course._id}
        teacherId={this.state.teacher._id}
      />
    );
  }


  /*
   * CourseType
   */
  _resetCourseType() {
    this.setState({'courseType': {} });
    if ( this.refs.courseTypeAdmin ) {
      this.refs.courseTypeAdmin.list(this.state.course._id, this.state.teacher._id);
      this.refs.courseTypeAdmin.refs.courseTypeSection.hideSection();
    }
  }

  setCourseType(courseType){
    this.setState({'courseType': courseType});
    this._resetSchedule();
  }

  setCourseTypes(courseTypes){
    this.setState({'courseTypes': courseTypes});
  }

  getCourseType(){
    return (
      <CourseType
        ref="courseTypeAdmin"
        setCourseType={this.setCourseType.bind(this)}
        setCourseTypes={this.setCourseTypes.bind(this)}
        courseType={ this.state.courseType }
        courseTypes={ this.state.courseTypes }
        courseId={this.state.course._id}
        teacherId={this.state.teacher._id}
      />
    );
  }


  /*
   * Schedule
   */
  _resetSchedule(){
    this.setState({'schedule': {} });
    if (this.refs.scheduleAdmin) {
      this.refs.scheduleAdmin.list(this.state.course._id, this.state.teacher._id, this.state.courseType._id);
      this.refs.scheduleAdmin.refs.scheduleSection.hideSection();
    }
  }
  setSchedule(schedule){
    this.setState({'schedule': schedule});
  }

  setSchedules(schedules){
    this.setState({'schedules': schedules});
  }

  getSchedule(){
    return (
      <Schedule
        ref="scheduleAdmin"
        setSchedule={this.setSchedule.bind(this)}
        setSchedules={this.setSchedules.bind(this)}
        schedule={ this.state.schedule }
        schedules={ this.state.schedules }
        courseId={this.state.course._id}
        teacherId={this.state.teacher._id}
        courseTypeId={this.state.courseType._id}
      />
    );
  }
  render() {

    var teacher = this.state.course._id ? this.teacher : '';


    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-xs-4 col-sm-3 col-md-2 col-md-offset-2 everything-checkbox"> 

            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <BtnInfo
              className="col-xs-4"
              onClick={ (e)=>{ this.forceState(); } }
              label="forceState"
            />
          </div>
        </div>

        <CourseName
          course={this.state.course}
          courses={this.state.courses}
          setCourses={this.setCourses.bind(this)}
          setCourse={this.setCourse.bind(this)}
        />

        {this.state.course._id ? this.getTeacher() : ''}

        {this.state.teacher._id ? this.getCourseDescription() : ''}

        {this.state.teacher._id ? this.getCourseType() : ''}

        {this.state.courseType._id ? this.getSchedule() : ''}

      </div>
    );
  }
}

