import React                               from "react";
import ClassNames                          from "classnames";
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';


export default class Dropdown extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    // bind the toogleDropDown
    this.toogleDropDown = this.toogleDropDown.bind(this);
  }



  select(item) {
      this.props.selected = item;
  }

  componentWillMount() {

  }

  toogleDropDown(){
    this.setState({ open: !this.state.open });
  }


  render() {

    var btnGroup = ClassNames( this.props.className, {
      'btn-group' : true,
      'open': ( this.state.open == true ),
    } );
    return (
      <div className={btnGroup}>
          <button 
            type="button"
            className="btn dropdown-toggle btn-info"
            onClick={this.toogleDropDown}>
              <span>
                  Enseignants...
              </span>
              <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" role="menu">
              <li>
                  <a href="" ng-click="selectTeacher(teacherOpt)" className="ng-binding">
                      Danielle Fontaine
                  </a>
              </li>
              <li>
                  <a href="" ng-click="selectTeacher(teacherOpt)" className="ng-binding">
                      Sandra Duval
                  </a>
              </li>
          </ul>
      </div>
    );
  }
}



