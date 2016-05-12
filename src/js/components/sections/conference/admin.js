import React                          from "react";
import Conference                     from "./conference/admin";
import Schedule                       from "./schedule/admin";

// Flux Conference
import ConferenceStore                from '../../../stores/conference/conferenceStore';
import * as ConferenceActions         from '../../../actions/conference/conferenceActions';

// Flux Schedule
import ScheduleStore                  from '../../../stores/conference/scheduleStore';
import * as ScheduleActions           from '../../../actions/conference/scheduleActions';

export default class ConferenceAdmin extends React.Component {

  constructor(props) {
    super(props);
    // hack isMounted() : http://jaketrent.com/post/set-state-in-callbacks-in-react/
    this.mounted = false;
    this.state = {
      conferences : [],
      conference : {},

      schedules: [],
      schedule : {},

    };
  }

  checkMounted(cb, _this){
    console.log('this.mounted', _this.mounted)
    if(_this.mounted || true){
      cb(_this);
    }
  }

  componentDidMount() {
    this.mounted = true;

    // Conference
    let conferenceListListener = function(){ return this.checkMounted(this._setConferences, this); }
    ConferenceStore.addListListener( conferenceListListener.bind(this) );
    ConferenceStore.addReadListener(this._getConference.bind(this));
    ConferenceStore.addDeletedListener(this._deletedConference.bind(this));

    // Schedule
    ScheduleStore.addListListener(this._setSchedules.bind(this));
    ScheduleStore.addReadListener(this._getSchedule.bind(this));
    ScheduleStore.addDeletedListener(this._deletedSchedule.bind(this));
  }

  componentWillUnmount() {
    this.mounted = false;

    // Conference
    ConferenceStore.removeListListener(this._setConferences.bind(this));
    ConferenceStore.removeReadListener(this._getConference.bind(this));
    ConferenceStore.removeDeletedListener(this._deletedConference.bind(this));

    // Schedule
    ScheduleStore.removeListListener(this._setSchedules.bind(this));
    ScheduleStore.removeReadListener(this._getSchedule.bind(this));
    ScheduleStore.removeDeletedListener(this._deletedSchedule.bind(this));
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

  _setConferences(_this){
    if(_this.mounted || true){
      _this.setState({'conferences': ConferenceStore.getConferences()});
    }
  }

  setConferences(conferences){
    if(this.mounted || true){
      this.setState({'conferences': conferences});
    }
  }


  setConference(conference){
    if(this.mounted || true){
      this.setState({'conference': conference}, function(){
        this._resetSchedule();
      });
    }
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
    if(this.mounted || true){
      this.setState({'schedule': {} }, function(){
        if (this.refs.scheduleAdmin) {
          console.log('ScheduleActions.getSchedules()')
          ScheduleActions.getSchedules(this.state.conference._id);
          this.refs.scheduleAdmin.refs.scheduleSection.hideSection();
        }
      });
    }
  }

  _deletedSchedule(){
    this._getSchedule();
  }

  _getSchedule(){
    this.setSchedule(ScheduleStore.getSchedule());
  }

  _setSchedules(){
    if(this.mounted || true){
      this.setState({'schedules': ScheduleStore.getSchedules()});
    }
  }

  setSchedule(schedule){
    if(this.mounted || true){
      this.setState({'schedule': schedule}, function(){
        
      });
    }
  }

  setSchedules(schedules){
    if(this.mounted || true){
      this.setState({'schedules': schedules});
    }
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