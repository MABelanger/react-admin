import React                      from "react";
import TextInput                  from "./components/commons/TextInput";
import SectionTop                 from "./components/commons/sectionTop/SectionTop";
import CourseNameSection          from "./components/sections/CourseNameSection";
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
      list:list
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
        <CourseNameSection list={this.state.courses} />
      </div>
    );
  }
}

