import React                      from "react";
import TextInput                  from "../../commons/TextInput";

/*
id
firstName
lastName
schoolName
schoolUrl
tel
*/
export default class CtrlInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      schoolName: "",
      schoolUrl: "",
      tel: ""
    };
  }


  changeFirstName(name, value) {
    this.setState({ 
      firstName: value
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      courseName: nextProps.course.name
    });
  }

  render() {
    return (
      <div>
        <TextInput
          name="firstName"
          label="Nom"
          ref="firstName"
          value={this.state.firstName}
          changeValue={ (name, value) => { this.changeFirstName(name, value); } }
        />
      </div>
    );
  }
}