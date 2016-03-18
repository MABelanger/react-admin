import React                      from "react";

export default class BtnSuccess extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    //console.log('this.props.', this.props)
  }
  render() {
    return (
      <button
        className="btn btn-success"
        onClick={ (e)=>{this.props.onClick(e);} }>
          {this.props.label}
        </button>
    );
  }
}