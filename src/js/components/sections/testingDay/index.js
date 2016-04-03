// vendors
import React                      from "react";
import classNames                 from "classnames/bind";
import ModalBootstrap             from "../../ModalBootstrap";
import toastr                     from 'toastr';


// modules
import CtrlSelect                 from "../ctrl/CtrlSelect";
import CtrlSaveDel                from "../ctrl/CtrlSaveDel";
import CtrlInput                  from "./CtrlInput";
import * as adminHelper           from "../helper";



// Styles
import 'toastr/build/toastr.css';
import sectionStyles              from "../styles/section.scss"



export default class ScheduleSection extends React.Component {

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
  create(testingDay){
     // call admin to create the testingDay
     this.props.onCreate(testingDay);

  }

  /**
   * Update
   **/
  save(testingDay){
    // call admin to save the testingDay
    this.props.onSave(testingDay);
  }

  // Save button click
  onCtrlSave(e){

    // Get the new values fields
    let testingDayInput = this.refs.ctrlInput.getFields();
    let testingDay = this.props.testingDay;

    testingDay = adminHelper.overwriteAttrs(testingDayInput, testingDay);
    // if testingDay exist, save it, else create it
    if(testingDay._id) {
      this.props.onSave(testingDay);
    }
    else{
      this.props.onCreate(testingDay);
    }
    this.hideSection();
  }
  /**
   * Delete
   **/
  delete(){
    this.props.onDelete(this.props.testingDay);
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

  // A testingDay has been selected
  select(testingDay){
    this.props.onSelect(testingDay);
  }

  // Modify button click
  modify(){
    this.setState({'showSection': !this.state.showSection});
  }

  getCtrlSaveDel(){
    return(
      <CtrlSaveDel
        noRow={true}
        onSave={ (e)=>{ this.onCtrlSave(e); } }
        onDelete={ (e)=>{ this.onCtrlDelete(e); } }
      />
    );
  }

  // render the component
  render() {
    let cx = classNames.bind(sectionStyles);
    let sectionClasses = cx({
      'section-transition' : true,
        'section-show': ( this.state.showSection == true ),
        'section-hide': ( this.state.showSection == false )
    });

    return (
      <div className="container">

        <ModalBootstrap
          ref="modalBootstrap"
          msg={
            "Voulez-vous vraiment supprimer ce cour "
            + '( ' + this.props.testingDay.day + ' ) ?'
            + " tout les professeurs relié à ce cour ainsi que leurs horaires seront aussi supprimé !"
          }
          onYes={::this.delete}
        />

        <CtrlSelect
          list={this.props.testingDays}
          title="Schedule"
          onSelect={ this.select.bind(this) }
          onModify={this.modify.bind(this)}
          onNew={ this.new.bind(this) }
          value={ this.props.testingDay.day}
          id={ this.props.testingDay._id }
        />

        <div className="section-animation">
          <div className={sectionClasses}>
            <CtrlInput
              ref="ctrlInput"
              testingDay={this.props.testingDay}
              ctrlSaveDel={this.getCtrlSaveDel.bind(this)}
            />
          </div>
        </div>

      </div>
    );
  }
}
