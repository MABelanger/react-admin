var coursesApi =                  require("../../api/coursesApi");

export function fetchAllCourses(_this){
  coursesApi.getAllCourses(courses => {
    _this.setState({'courses' : courses});
  });
}
