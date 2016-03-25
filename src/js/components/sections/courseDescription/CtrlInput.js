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
    console.log('nextProps', nextProps)
    if(nextProps.courseDescription) {
      console.log('nextProps.courseDescription', nextProps.courseDescription)
      this.setState({
        courseType: nextProps.courseDescription.courseType,
        note: nextProps.courseDescription.note,
        image: nextProps.courseDescription.image,
        description: nextProps.courseDescription.description,
        price: nextProps.courseDescription.price,
        isVisible: nextProps.courseDescription.isVisible
      });
    }
  }

  render() {
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