import React                      from "react";
import Conference                 from "./conference/admin";
import Schedule                   from "./schedule/admin";

// Flux Schedule
import ConferenceStore                from '../../../stores/conference/conferenceStore';
import * as ConferenceActions         from '../../../actions/conference/conferenceActions';

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

  componentWillMount() {
    // Schedule
    ConferenceStore.addListListener(this._setConferences.bind(this));
    ConferenceStore.addReadListener(this._getConference.bind(this));
    ConferenceStore.addDeletedListener(this._deletedConference.bind(this));

  }

  componentWillUnmount() {
    // Conference
    ConferenceStore.removeListListener(this._setConferences.bind(this));
    ConferenceStore.removeReadListener(this._getConference.bind(this));
    ConferenceStore.removeDeletedListener(this._deletedConference.bind(this));

  }


  /*
   * Conference
   */
  _deletedConference(){
    this._getConference();
  }

  _getConference(){
    this.setConference(ConferenceStore.getConference());
  }

  _setConferences(){
    this.setState({'conferences': ConferenceStore.getConferences()});
  }

  setConferences(conferences){
    this.setState({'conferences': conferences});
  }


  setConference(conference){
    this.setState({'conference': conference}, function(){
      this._resetSchedule();
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
        this.refs.scheduleAdmin.list(this.state.conference._id);
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
      <div>
        { this.renderConference() }
        { this.state.conference._id ? this.renderSchedule() : '' }
      </div>
    );
  }
}

