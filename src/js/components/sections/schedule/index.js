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
  create(schedule){
     // call admin to create the schedule
     this.props.onCreate(schedule);

  }

  /**
   * Update
   **/
  save(schedule){
    // call admin to save the schedule
    this.props.onSave(schedule);
  }

  // Save button click
  onCtrlSave(e){

    // Get the new values fields
    let scheduleInput = this.refs.ctrlInput.getFields();
    let schedule = this.props.schedule;

    schedule = adminHelper.overwriteAttrs(scheduleInput, schedule);
    // if schedule exist, save it, else create it
    if(schedule._id) {
      this.props.onSave(schedule);
    }
    else{
      this.props.onCreate(schedule);
    }
    this.hideSection();
  }
  /**
   * Delete
   **/
  delete(){
    this.props.onDelete(this.props.schedule);
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

  // A schedule has been selected
  select(schedule){
    this.props.onSelect(schedule);
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

    return (
      <div className="container">

        <ModalBootstrap
          ref="modalBootstrap"
          msg={
            "Voulez-vous vraiment supprimer ce cour "
            + '( ' + this.props.schedule.dayName + ' ) ?'
            + " tout les professeurs relié à ce cour ainsi que leurs horaires seront aussi supprimé !"
          }
          onYes={::this.delete}
        />

        <CtrlSelect
          list={this.props.schedules}
          title="Schedule"
          onSelect={ this.select.bind(this) }
          onModify={this.modify.bind(this)}
          onNew={ this.new.bind(this) }
          value={ this.props.schedule.dayName}
        />

        <div className="section-animation">
          <div className={sectionClasses}>
            <CtrlInput ref="ctrlInput" schedule={this.props.schedule} />
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
