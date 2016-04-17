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

export function getErrorsStr(errors){
  let errorsStr = '';
  // for all errors, build line for each one.
  for (var property in errors) {
    if (errors.hasOwnProperty(property)) {
      if( errors[ property ].message ){
        errorsStr += "- " + errors[ property ].message + '<br/>';
      }
    }
  }
  return errorsStr;
}

export function getError(name, errors) {
  if (errors && errors[name]){
    return errors[name].message;
  } else {
    return '';
  }
}