// vendors
import React                      from "react";
import classNames                 from "classnames/bind";
import ModalBootstrap             from "../../ModalBootstrap";
import toastr                     from 'toastr';

// modules
import CtrlSelect                 from "../ctrl/CtrlSelect";
import CtrlSaveDel                from "../ctrl/CtrlSaveDel";
import CtrlInput                  from "./CtrlInput";

// API
var coursesApi =                  require("../../../api/coursesApi");

// Styles
import 'toastr/build/toastr.css';
import sectionStyles              from "../styles/section.scss"



export default class Teacher extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showSection: false,
      teacher: {}
    };
  }

  /**
   * Create
   **/
  create(teacher){
     // call admin to create the teacher

  }

  /**
   * Update
   **/
  save(teacher){
    // call admin to save the teacher
  }

  // Save button click
  onCtrlSave(e){

    // Get the new values fields
    let fields = this.refs.ctrlInput.getFields();
    let objDocument= this.state.teacher;

    // Merge the new value into the existing object.
    for(var attr in fields) {
      if( fields.hasOwnProperty(attr) ){
        objDocument[attr] = fields[attr];
      }
    }
    // if objDocument exist, save it, else create it
    if(objDocument._id) {
      this.save(objDocument);
    }
    else{
      this.create(objDocument);
    }
  }
  /**
   * Delete
   **/
  delete(){

  }

  /**
   * Btn Control
   **/
  onCtrlDelete(course){
    this.refs.modalBootstrap.open();
  } 


  // Show all property section fields
  showSection(){
    this.setState({'showSection': true});
  }

   // Hide all property section fields
  hideSection(){
    console.log('hide Section')
    this.setState({'showSection': false});
  }

  // New button click
  new(){
    this.setState({'teacher': {}});
    this.showSection();
  }

  // A teacher has been selected
  select(teacher){
    this.setState({teacher: teacher});
    // Call onSelect for admin
    this.props.onSelect(teacher);
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
            + '( ' + this.state.teacher.firstName + ' ) ?'
            + " tout les professeurs relié à ce cour ainsi que leurs horaires seront aussi supprimé !"
          }
          onYes={::this.delete}
        />

        <CtrlSelect
          list={this.props.teachers}
          title="Professeurs"
          onSelect={ this.select.bind(this) }
          onModify={this.modify.bind(this)}
          onNew={ this.new.bind(this) }
          value={ this.state.teacher.firstName}
        />

        <div className="section-animation">
          <div className={sectionClasses}>
            <CtrlInput ref="ctrlInput" teacher={this.state.teacher} />
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