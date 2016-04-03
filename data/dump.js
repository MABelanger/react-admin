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

console.log(moment().startOf('day').utcOffset("-04:00").toISOString());
console.log(moment("2016-03-18T20:28:00.000Z").toISOString());
console.log(moment("2016-03-18T20:28:00.000Z").utcOffset( moment().utcOffset() ).toString());
console.log(moment("2016-03-18T20:28:00.000Z").toString());

let isoDate = moment("2016-03-18T20:28:00.000Z").utcOffset("-04:00").toISOString();
console.log('isoDate', isoDate);

let utcDate = moment("2016-03-18T20:28:00.000Z").utc().format();
console.log('utcDate', utcDate);