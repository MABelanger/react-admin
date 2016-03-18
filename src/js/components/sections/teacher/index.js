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



  save(course){
    coursesApi.saveCourse(course, (course) => {
      this.setState({'course': course});
      console.log('course', course)
    });
  }


  _onCreateDone(course){
    if(course._id){
      this.setState({'course': course});
      this.props.onFetchAllCourses();
      this.setState({'courses' : this.state.courses});
      toastr.success('Le cours à été crée.');
    }
  }

  create(course){
    coursesApi.createCourse(course, (err, res) => {
      if(err){
        toastr.error('Erreur Creation', err);
      }else {
        let course = res.body;
        this._onCreateDone(course);
      }
    });
  }

  onNew(){
    this.setState({'course': {}});
    this.showSection();
  }


  onSelect(course){
    this.setState({course: course});
    console.log('onSelect', course);
  }

  onSave(e){
    console.log('onSave');
    //console.log('this.refs', this.refs.ctrlInput.refs.courseName.refs.courseName.value);
    let courseName = this.refs.ctrlInput.getCourseName();
    let course= this.state.course;
    course.name = courseName;

    // if course exist, save it, else create it
    if(course._id) {
      this.save(course);
    }
    else{
      this.create(course);
    }
  }

  onDelete(e){
    this.onDelete(this.state.course);
  }

  showSection(){
    this.setState({'showSection': true});
  }

  hideSection(){
    console.log('hide Section')
    this.setState({'showSection': false});
  }

  onModify(){
    console.log('onModify');
    this.setState({'showSection': !this.state.showSection});
  }


  _onDeleteDone(){
    this.setState({'course': {}});
    this.props.onFetchAllCourses();
    toastr.success('Le cour à été supprimé.');
    this.hideSection();
  }

  onDeleteYes(){
    coursesApi.deleteCourse(this.state.course, (err, res) => {
      if(err){
        toastr.error('Erreur Supression', err);
      }else {
        this._onDeleteDone();
      }
    });
  }

  onDeleteNo(){
    this.refs.modalBootstrap.close();
  }

  onDelete(course){
    this.refs.modalBootstrap.open();
  } 

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
            "Voulez-vous vraiment supprimer ce cour"
            + '(' + this.state.course.name + ') ?'
            + " tout les professeurs relié à ce cour ainsi que leurs horaires seront aussi supprimé !"
          }
          onYes={::this.onDeleteYes}
          onNo={::this.onDeleteNo}
        />

        <CtrlSelect
          list={this.props.courses}
          title="Noms de cours"
          onSelect={ this.onSelect.bind(this) }
          onModify={this.onModify.bind(this)}
          onNew={ this.onNew.bind(this) }
          value={ this.state.course.name }
        />

        <div className="section-animation">
          <div className={sectionClasses}>
            <CtrlInput ref="ctrlInput" course={this.state.course} />
            <CtrlSaveDel
              onSave={ (e)=>{ this.onSave(e); } }
              onDelete={ (e)=>{ this.onDelete(e); } }
            />
          </div>
        </div>

      </div>
    );
  }
}
