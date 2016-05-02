import React                      from "react";
import CourseName                 from "./courseName/admin";
import Teacher                    from "./teacher/admin";
import CourseDescription          from "./courseDescription/admin";
import CourseType                 from "./courseType/admin";
import Schedule                   from "./schedule/admin";
import FreeDay                    from "./freeDay/admin";
import BtnInfo                    from "../../commons/BtnInfo";


export default class CourseAdmin extends React.Component {

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

      freeDays: [],
      freeDay : {},

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
    });
  }

  setTeachers(teachers){
    this.setState({'teachers': teachers});
  }



  setTeacher(teacher){
    this.setState({'teacher': teacher}, function(){
      this._resetCourseDescription();
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
    this.setState({'courseDescription': {}}, function(){
      if ( this.refs.courseDescriptionAdmin ) {
        this.refs.courseDescriptionAdmin.read( this.state.course._id, this.state.teacher._id );
        this.refs.courseDescriptionAdmin.refs.courseDescriptionSection.hideSection();
      }
      this._resetCourseType();
    });
  }

  setCourseDescription(courseDescription) {
    this.setState({'courseDescription': courseDescription}, function(){
      this._resetCourseType();
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
      this._resetFreeDay();
    });
  }

  setSchedule(schedule){
    this.setState({'schedule': schedule}, function(){
      this._resetFreeDay();
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
  _resetFreeDay(){
    this.setState({'freeDay': {} }, function(){
      if (this.refs.freeDayAdmin) {
        this.refs.freeDayAdmin.list(
            this.state.course._id,
            this.state.teacher._id,
            this.state.courseType._id,
            this.state.schedule._id,
        );
        this.refs.freeDayAdmin.refs.freeDaySection.hideSection();
      }
    });
  }

  setFreeDay(freeDay){
    this.setState({'freeDay': freeDay});
  }

  setFreeDays(freeDays){
    this.setState({'freeDays': freeDays});
  }

  renderFreeDay(){
    return (
      <div>
        <FreeDay
          ref="freeDayAdmin"
          setFreeDay={this.setFreeDay.bind(this)}
          setFreeDays={this.setFreeDays.bind(this)}
          freeDay={ this.state.freeDay }
          freeDays={ this.state.freeDays }
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

    let freeDay = {
      _id: '5700701f83456569686a374b'
    };

    this.setState({
      course : course,
      teacher : teacher,
      courseType : courseType,
      schedule: schedule,
      freeDay: freeDay
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
        { (this.state.courseDescription && this.state.courseDescription.courseType) ? this.renderCourseType() : '' }
        { this.state.courseType._id ? this.renderSchedule() : '' }
        { this.state.schedule._id ? this.renderFreeDay() : '' }
      </div>
    );
  }
}

