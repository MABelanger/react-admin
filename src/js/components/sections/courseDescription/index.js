// vendors
import React                      from "react";
import classNames                 from "classnames/bind";
import ModalBootstrap             from "../../ModalBootstrap";
import toastr                     from 'toastr';


// modules
import CtrlSelect                 from "../ctrl/CtrlSelect";
import CtrlSaveDel                from "../ctrl/CtrlSaveDel";
import CtrlModNew                from "../ctrl/CtrlModNew";

import CtrlInput                  from "./CtrlInput";
import * as adminHelper           from "../helper";



// Styles
import 'toastr/build/toastr.css';
import sectionStyles              from "../styles/section.scss"



export default class Teacher extends React.Component {

  constructor(props) {
    super(props);
    // expose the method to the parent via props
    this.showSection = this.showSection.bind(this);
    this.hideSection = this.hideSection.bind(this);

    this.state = {
      showSection: false,
    };
  }


  /**
   * Create
   **/
  create(courseDescription){
     // call admin to create the courseDescription
     this.props.onCreate(courseDescription);

  }

  /**
   * Update
   **/
  save(courseDescription){
    // call admin to save the courseDescription
    this.props.onSave(courseDescription);
  }

  _isExist(courseDescription){
    if ( courseDescription && courseDescription.courseType ){
      return true;
    }
    return false;
  }

  // Save button click
  onCtrlSave(e){
    // Get the new values fields
    let courseDescriptionInput = this.refs.ctrlInput.getFields();
    if ( this._isExist(courseDescriptionInput) ) {
      let courseDescription = adminHelper.overwriteAttrs(courseDescriptionInput, this.props.courseDescription);
      // if courseDescription exist, save it, else create it
      this.props.onSave(courseDescription);
    }
    else{
      this.props.onCreate(courseDescriptionInput);
    }
    this.hideSection();
  }
  /**
   * Delete
   **/
  delete(){
    this.props.onDelete();
    this.hideSection()
  }

  /**
   * Btn Control
   **/
  onCtrlDelete(e){
    this.refs.modalBootstrap.open();
  } 


  // Show all property section fields
  showSection(){
    this.setState({'showSection': true});
  }

   // Hide all property section fields
  hideSection(){
    this.setState({'showSection': false});
  }

  // New button click
  new(){
    this.props.onNew();
    this.showSection();
  }


  // Modify button click
  modify(){
    this.setState({'showSection': !this.state.showSection});
  }

  // render the component
  render() {
    let cx = classNames.bind(sectionStyles);
    let sectionClasses = cx({
      'section-transition' : true,
        'section-show': ( this.state.showSection == true ),
        'section-hide': ( this.state.showSection == false )
    });

    let isExist = this._isExist(this.props.courseDescription);

    // TODO : add ( txt ... ) ?
    return (
      <div className="container">

        <ModalBootstrap
          ref="modalBootstrap"
          msg={
            "Voulez-vous vraiment supprimer cette description de cours "
            + '( ' + ' ) ?'
            + " tout la description ainsi que l'horaire seront aussi supprimé !"
          }
          onYes={::this.delete}
        />

        <CtrlModNew
          title="Course Type"
          onModify={this.modify.bind(this)}
          onNew={ this.new.bind(this) }
          value={ isExist }
        />

        <div className="section-animation">
          <div className={sectionClasses}>

            <CtrlInput
              ref="ctrlInput"
              courseDescription={ this.props.courseDescription} 
            />
            <CtrlSaveDel
              onSave={ (e)=>{ this.onCtrlSave(e); } }
              onDelete={ (e)=>{ this.onCtrlDelete(e); } }
            />
          </div>
        </div>
      </div>
    );
  }
}
