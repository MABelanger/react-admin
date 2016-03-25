import React                      from "react";
import TextInput                  from "../../commons/TextInput";
import ReactQuill                 from "../../commons/reactQuill";

export default class CtrlInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "courseType": "",
      "note": "",
      "image": "",
      "description": "",
      "price": "",
      "isVisible": true
    };
  }


  changeValue(name, value) {
    let newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  getFields(){
    return {
      courseType: this.state.courseType,
      note: this.state.note,
      image: this.state.image,
      description: this.state.description,
      price: this.state.price,
      isVisible: this.state.isVisible
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.course) {
      this.setState({
        courseType: nextProps.course.courseType,
        note: nextProps.course.note,
        image: nextProps.course.image,
        description: nextProps.course.description,
        price: nextProps.course.price,
        isVisible: nextProps.course.isVisible
      });
    }
  }

  render() {
    console.log('this.props', this.props)
    return (
      <div>
        <TextInput
          name="courseType"
          label="Type"
          ref="courseType"
          value={this.state.courseType}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
        <ReactQuill/>
      </div>
    );
  }
}