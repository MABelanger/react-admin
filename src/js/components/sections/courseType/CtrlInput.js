import React                      from "react";
import TextInput                  from "../../commons/TextInput";
import ReactQuill                 from "../../commons/reactQuill";

export default class CtrlInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
    };
  }

  changeValue(name, value) {
    let newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  getFields(){
    return {
      name: this.state.name,
      description: this.state.description,
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.courseType) {
      this.setState({
        name: nextProps.courseType.name,
        description: nextProps.courseType.description,
      });
    }
  }
 
  render() {
    return (
      <div>
        <TextInput
          name="name"
          label="Titre"
          ref="name"
          value={this.state.name}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
        <ReactQuill
          name="description"
          label="Note"
          ref="description"
          value={this.state.description}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
      </div>
    );
  }
}