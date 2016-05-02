var conferencesApi =                  require("./api");
import React                      from "react";
import toastr                     from 'toastr';

import ConferenceNameSection          from "./section";


// CSS
import 'toastr/build/toastr.css';



export default class ConferenceNameAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toastrMsg: {},
      errors: {},
    };
  }

  // TODO use FLUX
  componentWillMount(){
    this.list();
  }

  _resetMsg(){
    this.setState({
      toastrMsg: {},
      errors: {}
    });
  }

  select(conference){
    this.props.setConference(conference);
    this._resetMsg();
  }

  new(){
    this.props.setConference({});
    this._resetMsg();
  }


  /**
   * CRUD Operations
   **/
  // Create
  create(conference){
    conferencesApi.create(conference)
      .then( (conference) => {
        this._resetMsg();
        this.props.setConference(conference);
        this.list();

        let toastrMsg = { success : 'Le cours à été crée.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.conferenceNameSection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de création.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
      });
  }

  // Read
  list(){
    conferencesApi.list(conferences => {
      this.props.setConferences(conferences);
    });
  }

  // Update
  save(conference){
    conferencesApi.save(conference)
      .then( (conference) => {
        this._resetMsg();
        this.props.setConference(conference);
        this.list();

        let toastrMsg = { success : 'Le cours à été Sauvegardé.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.conferenceNameSection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de sauvegarde.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
      });
  }

  // Delete
  delete(){
    conferencesApi.delete(this.props.conference)
      .then( (conference) => {
        this._resetMsg();
        this.props.setConference({});
        this.list();

        let toastrMsg = { success : 'Le cours à été supprimé.'};
        this.setState({ toastrMsg: toastrMsg });

        this.refs.conferenceNameSection.hideSection();
      }, (errors) => {
        let toastrMsg = { error : "Erreur de supression.<br/>"};
        this.setState({ errors: errors, toastrMsg: toastrMsg });
      });
  }

  render() {
    return (
      <ConferenceNameSection
        ref="conferenceNameSection"
        conferences={this.props.conferences}
        conference={this.props.conference}
        onSelect={this.select.bind(this)}
        onNew={this.new.bind(this)}
        errors={this.state.errors}
        toastrMsg={this.state.toastrMsg}

        onCreate={this.create.bind(this)}
        onSave={this.save.bind(this)}
        onDelete={this.delete.bind(this)}
      />
    );
  }
}

