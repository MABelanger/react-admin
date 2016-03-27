import React                      from "react";
import TextInput                  from "../../commons/TextInput";
import ReactQuill                 from "../../commons/reactQuill";
import ImageUpload                from "../../ImageUpload";

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
    console.log(name, value);
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
    if(nextProps.courseDescription) {
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

        <ImageUpload
          name="image"
          label="Image"
          ref="courseDescriptionImg"
          url={this.state.image}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />

        <ReactQuill
          name="note"
          label="Note"
          ref="note"
          value={this.state.note}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />

        <ReactQuill
          name="description"
          label="Description"
          ref="description"
          value={this.state.description}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />

        <ReactQuill
          name="price"
          label="Prix"
          ref="price"
          value={this.state.price}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
      </div>
    );
  }
}