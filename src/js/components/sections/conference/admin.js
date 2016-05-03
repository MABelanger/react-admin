import React                      from "react";
import Conference                 from "./conference/admin";
import Schedule                   from "./schedule/admin";


export default class ConferenceAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      conferences : [],
      conference : {},

      schedules: [],
      schedule : {},

    };
  }

  componentDidMount(){

  }

  componentWillMount(){
    //this.list();
    //this.refs.conferenceAdmin.list();
  }


  /*
   * Conference
   */
  setConferences(conferences){
    this.setState({'conferences': conferences});
  }


  setConference(conference){
    this.setState({'conference': conference}, function(){
      console.log('conference', conference)
      //this._resetTeachers();
    });
  }

  renderConference(){
    return(
      <div>
        <Conference
          ref="conferenceAdmin"
          conference={this.state.conference}
          conferences={this.state.conferences}
          setConferences={this.setConferences.bind(this)}
          setConference={this.setConference.bind(this)}
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
    });
  }

  setSchedule(schedule){
    this.setState({'schedule': schedule}, function(){
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
          conferenceId={this.state.conference._id}
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
      <div className="container">
        { this.renderConference() }
        { this.state.conference._id ? this.renderSchedule() : '' }
      </div>
    );
  }
}

