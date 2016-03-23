import * as sectionHelper         from "./components/sections/helper";
sectionHelper.fetchAllCourses(this);


  componentWillMount(){
    this.list();
  }


  // render only if course change
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.courseId != this.props.courseId){
      this.list();
    }
  }



  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.courseId !== this.props.courseId;
  }

componentDidMount()