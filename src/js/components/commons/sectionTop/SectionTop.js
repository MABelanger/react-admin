import React                      from "react";
import TextInput                  from "./TextInput";
import Dropdown                   from "../dropdown/Dropdown";
import Request                    from "superagent";


var list = [
  {
    name : "yoga",
    link : "#yoga"
  },
  {
    name : "meditation",
    link : "#meditation"
  }
];


export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      course: {},
      list:[
        {
          name : "yoga",
          link : "#yoga"
        },
        {
          name : "meditation",
          link : "#meditation"
        }
      ]
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

  render() {
    return (
      <div>
        <Dropdown list={this.state.list} />
    );
  }
}

