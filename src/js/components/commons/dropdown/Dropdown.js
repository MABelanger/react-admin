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
    // bind the function to this that is not Autobinding with class
    this.toogleDropDown = this.toogleDropDown.bind(this);
    this.blurDropDown = this.blurDropDown.bind(this);
    this.mouseEnterMenu = this.mouseEnterMenu.bind(this);
    this.mouseLeaveMenu = this.mouseLeaveMenu.bind(this);
  }



  select(item) {
      this.props.selected = item;
  }

  componentWillMount() {

  }

  toogleDropDown(e){
    e.preventDefault();
    this.setState({ open: !this.state.open });
  }

  blurDropDown(e){
    e.preventDefault();
    if(this.state.mouseEnterMenu){
      console.log('Not close');
    }else {
      this.setState({ open: false });
    }
  }

  mouseEnterMenu(e){
    e.preventDefault();
    this.setState({ mouseEnterMenu: true });
    console.log('mouseEnterMenu');
  }

  mouseLeaveMenu(e){
    e.preventDefault();
    this.setState({ mouseEnterMenu: false });
    console.log('mouseLeaveMenu');
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
            onClick={this.toogleDropDown}
            onBlur={this.blurDropDown}>
              <span>
                  Enseignants...
              </span>
              <span className="caret"></span>
          </button>
          <ul 
            className="dropdown-menu"
            role="menu"
            onMouseEnter={this.mouseEnterMenu}
            onMouseLeave={this.mouseLeaveMenu}
            onClick={this.toogleDropDown}>
              <li>
                  <a href="#">
                      Danielle Fontaine
                  </a>
              </li>
              <li>
                  <a href="#">
                      Sandra Duval
                  </a>
              </li>
          </ul>
      </div>
    );
  }
}



