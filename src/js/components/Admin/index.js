var coursesApi =                  require("../../api/coursesApi");
import React                      from "react";
import CourseName                 from "./CourseName";
import Teacher                    from "./Teacher";
import CourseDescription          from "./CourseDescription";
import CourseType                 from "./CourseType";
import Schedule                   from "./Schedule";
import TestingDay                 from "./TestingDay";
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

      testingDays: [],
      testingDay : {},

    };
  }


  /*
   * Course
   */
  setCourses(courses){
    this.setState({'courses': courses});
  }

  componentDidMount(){

  }

  componentWillMount(){
    //this.list();
    //this.refs.courseNameAdmin.list();
  }

  setCourse(course){
    this.setState({'course': course}, function(){
      this._resetTeachers();
    });
  }

  renderCourseName(){
    return(
      <div>
        <CourseName
          ref="courseNameAdmin"
          course={this.state.course}
          courses={this.state.courses}
          setCourses={this.setCourses.bind(this)}
          setCourse={this.setCourse.bind(this)}
        />
        <hr/>
      </div>
    );
  }


  /*
   * Teacher
   */
  _resetTeachers(){
    this.setState({'teacher': {}}, function(){
      if(this.refs.teacherAdmin) {
        this.refs.teacherAdmin.list(this.state.course._id);
        this.refs.teacherAdmin.refs.teacherSection.hideSection();
      }
      this._resetCourseDescription();
      this._resetCourseType();
    });
  }

  setTeachers(teachers){
    this.setState({'teachers': teachers});
  }



  setTeacher(teacher){
    this.setState({'teacher': teacher}, function(){
      this._resetCourseDescription();
      this._resetCourseType();
    });
  }

  renderTeacher(){
    return (
      <div>
        <Teacher
          ref="teacherAdmin"
          courseId={this.state.course._id}
          teacher={this.state.teacher}
          teachers={this.state.teachers}
          setTeachers={this.setTeachers.bind(this)}
          setTeacher={this.setTeacher.bind(this)}
          />
        <hr/>
      </div>
    );
  }

  /*
   * CourseDescription
   */
  _resetCourseDescription() {
    // update the course description and hide sections
    // need an if because the component is not
    if ( this.refs.courseDescriptionAdmin ) {
      this.refs.courseDescriptionAdmin.read( this.state.course._id, this.state.teacher._id );
      this.refs.courseDescriptionAdmin.refs.courseDescriptionSection.hideSection();
    }
  }

  setCourseDescription(courseDescription) {
    this.setState({'courseDescription': courseDescription}, function(){

    });
  }

  renderCourseDescription(){
    return (
      <div>
        <CourseDescription
          ref="courseDescriptionAdmin"
          courseDescription={ this.state.courseDescription }
          setCourseDescription={this.setCourseDescription.bind(this)}
          courseId={this.state.course._id}
          teacherId={this.state.teacher._id}
        />
        <hr/>
      </div>
    );
  }


  /*
   * CourseType
   */
  _resetCourseType() {
    this.setState({'courseType': {} }, function(){
      if ( this.refs.courseTypeAdmin ) {
        this.refs.courseTypeAdmin.list(this.state.course._id, this.state.teacher._id);
        this.refs.courseTypeAdmin.refs.courseTypeSection.hideSection();
      }
      this._resetSchedule();
    });
  }

  setCourseType(courseType){
    this.setState({'courseType': courseType}, function(){
      this._resetSchedule();
    });
  }

  setCourseTypes(courseTypes){
    this.setState({'courseTypes': courseTypes});
  }

  renderCourseType(){
    return (
      <div>
        <CourseType
          ref="courseTypeAdmin"
          setCourseType={this.setCourseType.bind(this)}
          setCourseTypes={this.setCourseTypes.bind(this)}
          courseType={ this.state.courseType }
          courseTypes={ this.state.courseTypes }
          courseId={this.state.course._id}
          teacherId={this.state.teacher._id}
        />
        <hr/>
      </div>
    );
  }


  /*
   * Schedule
   */
  _resetSchedule(){
    this.setState({'schedule': {} }, function(){
      if (this.refs.scheduleAdmin) {
        this.refs.scheduleAdmin.list(this.state.course._id, this.state.teacher._id, this.state.courseType._id);
        this.refs.scheduleAdmin.refs.scheduleSection.hideSection();
      }
      this._resetTestingDay();
    });
  }

  setSchedule(schedule){
    this.setState({'schedule': schedule}, function(){
      this._resetTestingDay();
    });
    
  }

  setSchedules(schedules){
    this.setState({'schedules': schedules});
  }

  renderSchedule(){
    return (
      <div>
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
        <hr/>
      </div>
    );
  }

  /*
   * Testing Day
   */
  _resetTestingDay(){
    this.setState({'testingDay': {} }, function(){
      if (this.refs.testingDayAdmin) {
        this.refs.testingDayAdmin.list(
            this.state.course._id,
            this.state.teacher._id,
            this.state.courseType._id,
            this.state.schedule._id,
        );
        this.refs.testingDayAdmin.refs.testingDaySection.hideSection();
      }
    });
  }

  setTestingDay(testingDay){
    this.setState({'testingDay': testingDay});
  }

  setTestingDays(testingDays){
    this.setState({'testingDays': testingDays});
  }

  renderTestingDay(){
    return (
      <div>
        <TestingDay
          ref="testingDayAdmin"
          setTestingDay={this.setTestingDay.bind(this)}
          setTestingDays={this.setTestingDays.bind(this)}
          testingDay={ this.state.testingDay }
          testingDays={ this.state.testingDays }
          courseId={this.state.course._id}
          teacherId={this.state.teacher._id}
          courseTypeId={this.state.courseType._id}
          scheduleId={this.state.schedule._id}
          />
        <hr/>
      </div>
    );
  }


  /*
   * Force Select
   */
   
  forceSelect(){
    let course = {
      _id : '570432f35b64f9c47dc5c486'
    };
    let teacher = {
      _id : '570433265b64f9c47dc5c488'
    };

    let courseType = {
      _id : '57116dbddadf99b0114469aa'
    };

    let schedule = {
      _id : '57116dcadadf99b0114469ab'
    };

    let testingDay = {
      _id: '5700701f83456569686a374b'
    };

    this.setState({
      course : course,
      teacher : teacher,
      courseType : courseType,
      schedule: schedule,
      testingDay: testingDay
    });
  }

  renderForceSelect(){
    return(
      <div className="clearfix">
        <BtnInfo
          className="col-xs-4"
          onClick={ (e)=>{ this.forceSelect(); } }
          label="forceSelect"
        />
      </div>
    );
  }

  /*
   * Render all sections
   */
  render() {
    return (
      <div className="container">
        { this.renderForceSelect() }
        { this.renderCourseName() }
        { this.state.course._id ? this.renderTeacher() : '' }
        { this.state.teacher._id ? this.renderCourseDescription() : '' }
        { (this.state.courseDescription && this.state.courseDescription.courseType)  ? this.renderCourseType() : '' }
        { this.state.courseType._id ? this.renderSchedule() : '' }
        { this.state.schedule._id ? this.renderTestingDay() : '' }
      </div>
    );
  }
}

