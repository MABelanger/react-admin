// vendors
import React                      from "react";
import classNames                 from "classnames/bind";
import ModalBootstrap             from "../../ModalBootstrap";

// modules
import CtrlSelect                 from "../ctrl/CtrlSelect";
import CtrlSaveDel                from "../ctrl/CtrlSaveDel";
import CtrlInput                  from "./CtrlInput";

// API
var coursesApi =                  require("../../../api/coursesApi");

// Styles

import sectionStyles              from "../styles/section.scss"



export default class CourseName extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showSection: false,
    };
  }



  // Save button click
  onCtrlSave(e){

    // Get the new values fields
    let courseInput = this.refs.ctrlInput.getCourse();
    let course= this.props.course;

    // Merge the new value into the existing object.
    for(var attr in courseInput) {
      if( courseInput.hasOwnProperty(attr) ){
        course[attr] = courseInput[attr];
      }
    }
    // if course exist, save it, else create it
    if(course._id) {
      this.props.onSave(course);
    }
    else{
      this.props.onCreate(course);
    }
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
    this.setState({'course': {}});
    this.showSection();
  }

  // A course has been selected
  select(course){
    this.setState({course: course});
    // update the Admin state
    this.props.onSelect(course);
  }

  // Modify button click
  modify(){
    this.setState({'showSection': !this.state.showSection});
  }

  onDelete(){
    this.hideSection();
    // call the admin delete
    this.props.onDelete();
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
            + '( ' + this.props.course.name + ' ) ?'
            + " tout les professeurs relié à ce cour ainsi que leurs horaires seront aussi supprimé !"
          }
          onYes={::this.onDelete}
        />

        <CtrlSelect
          list={this.props.courses}
          title="Noms de cours"
          onSelect={ this.select.bind(this) }
          onModify={this.modify.bind(this)}
          onNew={ this.new.bind(this) }
          value={ this.props.course.name }
        />

        <div className="section-animation">
          <div className={sectionClasses}>
            <CtrlInput ref="ctrlInput" course={this.props.course} />
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
