import React                      from "react";
import TextInput                  from "./TextInput";
import Dropdown                   from "../dropdown/Dropdown";
import Request                    from "superagent";


var colours = [{
    name: "Red",
    hex: "#F21B1B"
}, {
    name: "Blue",
    hex: "#1B66F2"
}, {
    name: "Green",
    hex: "#07BA16"
}];



export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      course: {}
    };
  }

  componentWillMount() {
    console.log('componentWillMount');
    var URL = 'http://localhost:3000/api/courses';
    //var URL = 'http://www.omdbapi.com/?s=toto';
    Request
    .get(URL, function(err, res){
      console.log(res.body[0])
      this.setState({
        courses: res.body,
        course: res.body[0]
      });
    }.bind(this));

  }

  changeName(name, value) {
    this.state.course.name = value;
    this.setState({ course:  this.state.course });
  }

  render() {
    return (
      <div>
        <Dropdown list={colours} selected={colours[0]} />
        <TextInput
          name="name"
          label="Nom"
          value={this.state.course.name}
          changeValue={this.changeName.bind(this)}
          />
      </div>
    );
  }
}

