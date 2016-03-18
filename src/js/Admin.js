import React                      from "react";
import CourseNameSection          from "./components/sections/CourseNameSection";
import ToastrAlert                from "./components/ToastrAlert";
import ModalBootstrap             from "./components/ModalBootstrap";
import toastr                     from 'toastr';

var coursesApi =                  require("./api/coursesApi");

// Styles
import 'toastr/build/toastr.css';


export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      course: {},
      list: []
    };
  }

  _fetchAllCourses(){
    coursesApi.getAllCourses(courses => {
      this.setState({'courses' : courses});
    });
  }

  componentWillMount() {
    this._fetchAllCourses();
  }

  _onSaveDone(course){
    this.setState({'course': course});
    toastr.success('Le cours à été sauvegardé');
  }

  onSave(course){
    coursesApi.saveCourse(course, (err, res) => {
      if(err){
        toastr.error('Erreur sauvegarde', err);
      }else {
        let course = res.body;
        this._onSaveDone(course);
      }
    });
  }


  _onCreateDone(course){
    if(course._id){
      this.setState({'course': course});
      this.state.courses.push(course);
      this.setState({'courses' : this.state.courses});
      toastr.success('Le cours à été crée.');
    }
  }

  onCreate(course){
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
    this.refs.courseNameSection.showSection();
  }

  _onDeleteDone(){
    this.setState({'course': {}});
    this._fetchAllCourses();
    toastr.success('Le cour à été supprimé.');
    this.refs.courseNameSection.hideSection();
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

  onSelect(course){
    this.setState({course: course});
    console.log('onSelect', course);
  }



  render() {

    return (
      <div>
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

        <CourseNameSection
          ref="courseNameSection"
          courses={this.state.courses}
          course={this.state.course}
          onSave={this.onSave.bind(this)}
          onCreate={this.onCreate.bind(this)}
          onDelete={this.onDelete.bind(this)}
          onSelect={this.onSelect.bind(this)}
          onNew={this.onNew.bind(this)}
        />
      </div>
    );
  }
}

