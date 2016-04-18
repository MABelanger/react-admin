// vendors
import React                      from "react";
import classNames                 from "classnames/bind";
import ModalBootstrap             from "../../ModalBootstrap";
import toastr                     from 'toastr';
import moment                     from "moment";


// modules
import CtrlSelect                 from "../ctrl/CtrlSelect";
import CtrlSaveDel                from "../ctrl/CtrlSaveDel";
import CtrlInput                  from "./CtrlInput";
import * as sectionHelper           from "../helper";



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

  componentWillReceiveProps(nextProps) {
    let toastrMsg = nextProps.toastrMsg;
    let errorsStr = sectionHelper.getErrorsStr(nextProps.errors);

    if( nextProps.errors != this.props.errors ){ 
      if ( toastrMsg.error &&  errorsStr ){
        // if error msg toaster, put it at the top
        toastrMsg.error = toastrMsg.error + errorsStr;
      }

      // display the msg err
      if( toastrMsg.error ||  errorsStr ){
        toastr.error(toastrMsg.error);
      }
    }

    if (toastrMsg != this.props.toastrMsg) {
      // display the msg success
      if( toastrMsg.success ){
        toastr.success(toastrMsg.success);
      }
    }

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

    testingDay = sectionHelper.overwriteAttrs(testingDayInput, testingDay);
    // if testingDay exist, save it, else create it
    if(testingDay._id) {
      this.props.onSave(testingDay);
    }
    else{
      this.props.onCreate(testingDay);
    }
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


 /* 
  * custum cb for CtrlSelect
  */
  getName(item){
    moment.locale('fr');
    // remove the utcOffset added by .format()
    let date = moment( item.day ).utcOffset("+00:00");
    let name = moment(date).format('LL');
    return name;
  }

  getValue(){
    if(this.props.testingDay.day){
      return this.getName(this.props.testingDay);
    } else {
      return "Jours D'essaie...";
    }
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
      <div className="row">

        <ModalBootstrap
          ref="modalBootstrap"
          msg={
            "Voulez-vous vraiment supprimer ce cour "
            + '( ' + this.getValue() + ' ) ?'
            + " tout les professeurs relié à ce cour ainsi que leurs horaires seront aussi supprimé !"
          }
          onYes={::this.delete}
        />

        <CtrlSelect
          list={this.props.testingDays}
          title="Jours D'essaie"
          onSelect={ this.select.bind(this) }
          onModify={ this.modify.bind(this) }
          onNew={ this.new.bind(this) }

          id={ this.props.testingDay._id }
          cbGetName={ this.getName.bind(this) }
          cbGetValue={ this.getValue.bind(this) }
        />

        <div className="section-animation">
          <div className={sectionClasses}>
            <CtrlInput
              ref="ctrlInput"
              testingDay={this.props.testingDay}
              errors={this.props.errors}
              ctrlSaveDel={this.getCtrlSaveDel.bind(this)}
            />
          </div>
        </div>

      </div>
    );
  }
}
