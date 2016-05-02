import React                      from "react";
import Conference                 from "./conference/admin";


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


  /*
   * Conference
   */
  setConferences(conferences){
    this.setState({'conferences': conferences});
  }

  componentDidMount(){

  }

  componentWillMount(){
    //this.list();
    //this.refs.conferenceAdmin.list();
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
   * Render all sections
   { this.state.conference._id ? this.renderTeacher() : '' }
   */
  render() {
    return (
      <div className="container">
        { this.renderConference() }
        
      </div>
    );
  }
}

