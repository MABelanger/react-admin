import React                          from "react";
import toastr                         from 'toastr';

import ConferenceSection              from "./section";

// Flux Conference
import ConferenceStore                from '../../../../stores/conference/conferenceStore';
import * as ConferenceActions         from '../../../../actions/conference/conferenceActions';
import ConferenceConstants            from '../../../../constants/conference/conferenceConstants';

// CSS
import 'toastr/build/toastr.css';

export default class ConferenceAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toastrMsg: {},
      errors: {},
    };
  }

  componentWillMount() {
    ConferenceStore.addSavedListener(this.onSaved.bind(this));
    ConferenceStore.addDeletedListener(this.onDeleted.bind(this));
    ConferenceStore.addErrorListener(this.onError.bind(this));
  }

  componentWillUnmount() {
    ConferenceStore.removeSavedListener(this.onSaved.bind(this));
    ConferenceStore.removeDeletedListener(this.onDeleted.bind(this));
    ConferenceStore.removeErrorListener(this.onError.bind(this));
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

  /*
   * listener called by the store
   */

  onSaved(){
    this._resetMsg();
    let toastrMsg = { success : 'La conférence à été sauvegardé.'};
    this.setState({ toastrMsg: toastrMsg });
    this.refs.conferenceSection.hideSection();
  }

  onDeleted(){
    this._resetMsg();
    let toastrMsg = { success : 'La conférence à été supprimé.'};
    this.setState({ toastrMsg: toastrMsg });
    this.refs.conferenceSection.hideSection();
  }

  onError(){
    this._resetMsg();
    let errors = ConferenceStore.getErrors();
    console.log('errors', errors)
    let toastrMsg = { error : "Erreur.<br/>"};
    this.setState({ errors: errors, toastrMsg: toastrMsg });
  }

  /**
   * CRUD Operations
   **/
  // Create
  create(conference){
    ConferenceActions.createConference(conference);
  }

  // Read is admin by the parent component.

  // Update
  save(conference){
    ConferenceActions.saveConference(conference);
  }

  // Delete
  delete(){
    ConferenceActions.deleteConference(this.props.conference);  
  }

  render() {
    return (
      <ConferenceSection
        ref="conferenceSection"
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

