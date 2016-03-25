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



export default class Teacher extends React.Component {

  constructor(props) {
    super(props);
    // expose the method to the parent via props
    this.showSection = this.showSection.bind(this);
    this.hideSection = this.hideSection.bind(this);

    this.state = {
      showSection: true,
    };
  }


  /**
   * Create
   **/
  create(teacher){
     // call admin to create the teacher
     this.props.onCreate(teacher);

  }

  /**
   * Update
   **/
  save(teacher){
    // call admin to save the teacher
    this.props.onSave(teacher);
  }

  // Save button click
  onCtrlSave(e){

    // Get the new values fields
    let teacherInput = this.refs.ctrlInput.getFields();
    let teacher = this.props.course;

    teacher = adminHelper.overwriteAttrs(teacherInput, teacher);
    // if teacher exist, save it, else create it
    if(teacher._id) {
      this.props.onSave(teacher);
    }
    else{
      this.props.onCreate(teacher);
    }
    this.hideSection();
  }
  /**
   * Delete
   **/
  delete(){
    this.props.onDelete(this.props.course);
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

  // A teacher has been selected
  select(teacher){
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
            "Voulez-vous vraiment supprimer cette description de cours "
            + '( ' + ' ) ?'
            + " tout la description ainsi que l'horaire seront aussi supprimé !"
          }
          onYes={::this.delete}
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
