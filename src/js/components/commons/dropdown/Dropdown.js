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
    // bind the functions to this because is not Autobinding with class es6
    this.toogleDropDown = this.toogleDropDown.bind(this);
    this.blurDropDown = this.blurDropDown.bind(this);
    this.mouseEnterMenu = this.mouseEnterMenu.bind(this);
    this.mouseLeaveMenu = this.mouseLeaveMenu.bind(this);
    this.getRenderList = this.getRenderList.bind(this);
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
    // if we are not in the menu and we blur the btn dropdown
    // close the list.
    if(! this.state.mouseEnterMenu){
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

  getItem(name, link){
    return(
      <li>
          <a href={link}>
              {name}
          </a>
      </li>
    );
  }

  getRenderList(list){
    var items = [];
    for (var index in list) {
      var item = list[index];
      items.push( this.getItem(item.name, item.link) );
    }
    return items;
  }

  render() {
    var btnGroup = ClassNames(this.props.className, {
      'btn-group' : true,
      'open': ( this.state.open == true ),
    });

    console.log(this.props.list)

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
              {this.getRenderList( this.props.list )}
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



