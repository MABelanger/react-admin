import React                          from "react";
import CourseName                     from "./courseName/admin";
import Teacher                        from "./teacher/admin";
import CourseDescription              from "./courseDescription/admin";
import CourseType                     from "./courseType/admin";
import Schedule                       from "./schedule/admin";
import FreeDay                        from "./freeDay/admin";
import BtnInfo                        from "../../commons/BtnInfo";

import LoginForm                      from "../../user/loginForm";

// Flux CourseName
import CourseNameStore                from '../../../stores/courseNameStore';
import * as CourseNameActions         from '../../../actions/courseNameActions';

// Flux Teacher
import TeacherStore                   from '../../../stores/teacherStore';
import * as TeacherActions            from '../../../actions/teacherActions';

// Flux CourseDescription
import CourseDescriptionStore         from '../../../stores/courseDescriptionStore';
import * as CourseDescriptionActions  from '../../../actions/courseDescriptionActions';

// Flux CourseType
import CourseTypeStore                from '../../../stores/courseTypeStore';
import * as CourseTypeActions         from '../../../actions/courseTypeActions';

// Flux Schedule
import ScheduleStore                  from '../../../stores/scheduleStore';
import * as ScheduleActions           from '../../../actions/scheduleActions';



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

  componentWillMount() {
    // CourseName
    CourseNameStore.addListListener(this._setCourses.bind(this));
    CourseNameStore.addReadListener(this._getCourse.bind(this));
    CourseNameStore.addDeletedListener(this._deletedCourse.bind(this));

    // Teacher
    TeacherStore.addListListener(this._setTeachers.bind(this));
    TeacherStore.addReadListener(this._getTeacher.bind(this));
    TeacherStore.addDeletedListener(this._deletedTeacher.bind(this));

    // CourseDescription
    CourseDescriptionStore.addReadListener(this._getCourseDescription.bind(this));
    CourseDescriptionStore.addDeletedListener(this._deletedCourseDescription.bind(this));

    // CourseType
    CourseTypeStore.addListListener(this._setCourseTypes.bind(this));
    CourseTypeStore.addReadListener(this._getCourseType.bind(this));
    CourseTypeStore.addDeletedListener(this._deletedCourseType.bind(this));

    // Schedule
    ScheduleStore.addListListener(this._setSchedules.bind(this));
    ScheduleStore.addReadListener(this._getSchedule.bind(this));
    ScheduleStore.addDeletedListener(this._deletedSchedule.bind(this));

    CourseNameActions.getCourseNames();
  }

  componentWillUnmount() {
    // CourseName
    CourseNameStore.removeListListener(this._setCourses.bind(this));
    CourseNameStore.removeReadListener(this._getCourse.bind(this));
    CourseNameStore.removeDeletedListener(this._deletedCourse.bind(this));

    // Teacher
    TeacherStore.removeListListener(this._setTeachers.bind(this));
    TeacherStore.removeReadListener(this._getTeacher.bind(this));
    TeacherStore.removeDeletedListener(this._deletedTeacher.bind(this));

    // CourseDescription
    CourseDescriptionStore.removeReadListener(this._getCourseDescription.bind(this));
    CourseDescriptionStore.removeDeletedListener(this._deletedCourseDescription.bind(this));

    // CourseType
    CourseTypeStore.removeListListener(this._setCourseTypes.bind(this));
    CourseTypeStore.removeReadListener(this._getCourseType.bind(this));
    CourseTypeStore.removeDeletedListener(this._deletedCourseType.bind(this));

    // Schedule
    ScheduleStore.removeListListener(this._setSchedules.bind(this));
    ScheduleStore.removeReadListener(this._getSchedule.bind(this));
    ScheduleStore.removeDeletedListener(this._deletedSchedule.bind(this));
  }

  /*
   * Course
   */

  _deletedCourse(){
    this._getCourse();
  }

  _getCourse(){
    this.setCourse(CourseNameStore.getCourseName());
  }

  _setCourses(){
    this.setState({'courses': CourseNameStore.getCourseNames()});
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
        TeacherActions.getTeachers(this.state.course._id);
        this.refs.teacherAdmin.refs.teacherSection.hideSection();
      }
      this._resetCourseDescription();
    });
  }

  _deletedTeacher(){
    this._getTeacher();
  }

  _getTeacher(){
    this.setTeacher(TeacherStore.getTeacher());
  }

  _setTeachers(){
    this.setState( {'teachers': TeacherStore.getTeachers()} );
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
        CourseDescriptionActions.getCourseDescription(this.state.course._id, this.state.teacher._id);
        //this.refs.courseDescriptionAdmin.read( this.state.course._id, this.state.teacher._id );
        this.refs.courseDescriptionAdmin.refs.courseDescriptionSection.hideSection();
      }
      this._resetCourseType();
    });
  }

  _deletedCourseDescription(){
    this._getCourseDescription();
  }

  _getCourseDescription(){
    console.log('CourseDescriptionStore.getCourseDescription()', CourseDescriptionStore.getCourseDescription())
    this.setCourseDescription(CourseDescriptionStore.getCourseDescription());
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
        CourseTypeActions.getCourseTypes(this.state.course._id, this.state.teacher._id);
        this.refs.courseTypeAdmin.refs.courseTypeSection.hideSection();
      }
      this._resetSchedule();
    });
  }

  _deletedCourseType(){
    this._getCourseType();
  }

  _getCourseType(){
    this.setCourseType(CourseTypeStore.getCourseType());
  }

  _setCourseTypes(){
    this.setState( {'courseTypes': CourseTypeStore.getCourseTypes()} );
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
        ScheduleActions.getSchedules(this.state.course._id, this.state.teacher._id, this.state.courseType._id);
        //this.refs.scheduleAdmin.list(this.state.course._id, this.state.teacher._id, this.state.courseType._id);
        this.refs.scheduleAdmin.refs.scheduleSection.hideSection();
      }
      this._resetFreeDay();
    });
  }

  _deletedSchedule(){
    this._getSchedule();
  }

  _getSchedule(){
    this.setSchedule(ScheduleStore.getSchedule());
  }

  _setSchedules(){
    this.setState( {'schedules': ScheduleStore.getSchedules()} );
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
   * Render all sections
   */
  render() {
    return (
      <div>
        <LoginForm/>
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

