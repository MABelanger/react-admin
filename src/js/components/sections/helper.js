"use strict";

var coursesApi =                  require("../../api/coursesApi");

export function fetchAllCourses(_this){
  coursesApi.getAllCourses(courses => {
    _this.setState({'courses' : courses});
  });
}

// overwrite all attribute to the destination from source
// and then return the destination
export function overwriteAttrs(src, dest){
  for(var attr in src) {
    if( src.hasOwnProperty(attr) ){
      dest[attr] = src[attr];
    }
  }
  return dest;
}