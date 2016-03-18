import React                               from "react";
import ClassNames                          from "classnames";
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';


export default class Dropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dirty: false
    };
    // bind the functions to this because is not Autobinding with class es6
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

  onSelect(item){
    this.props.onSelect(item);
  }

  getItem(item){
    return(
      <li>
          <a href="#" onClick={ (e) => { this.onSelect(item); } }>
              {item.name}
          </a>
      </li>
    );
  }

  getRenderList(list){
    var items = [];
    for (var index in list) {
      var item = list[index];
      items.push( this.getItem(item) );
    }
    return items;
  }

  getValue(){
    if(this.props.value){
      return this.props.value;
    }else {
      return this.props.label + "...";
    }
  }

  render() {
    var btnGroup = ClassNames(this.props.className, {
      'btn-group' : true,
      'open': ( this.state.open == true ),
    });

    return (
      <div className={btnGroup}>
          <button 
            type="button"
            className="btn dropdown-toggle btn-info"
            onClick={ (e) => { this.toogleDropDown(e); } }
            onBlur={ (e) => { this.blurDropDown(e); } }>
              <span>
                  {this.getValue()}
              </span>
              &nbsp;
              <span className="caret"></span>
          </button>
          <ul 
            className="dropdown-menu"
            role="menu"
            onMouseEnter={ (e) => { this.mouseEnterMenu(e); } }
            onMouseLeave={ (e) => { this.mouseLeaveMenu(e); } }
            onClick={ (e) => { this.toogleDropDown(e); } }>
              {this.getRenderList( this.props.list )}
          </ul>
      </div>
    );
  }
}


