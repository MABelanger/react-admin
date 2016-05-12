"use strict";

import moment from 'moment';

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


function _compareObj(a, b, attName) {
  let nameA = a[attName].toUpperCase(); // ignore upper and lowercase
  let nameB = b[attName].toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB)
    return -1;
  else if (nameA > nameB)
    return 1;
  else 
    return 0;
}

export function getOrderedList(list, attName) {
  list.sort( (a, b) => {
    return _compareObj(a, b, attName);
  });
  return list;
}

function _getNow(){
  moment.locale('fr');
  let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
  return moment(new Date(Date.now() - tzoffset)).utcOffset(0);//.toISOString();
}

export function isNotExpired(ISOStringDate){
  let momentDate = moment( ISOStringDate ).utcOffset("+00:00")
  let now = _getNow();
  let isNotExpired = moment(now).isBefore(momentDate) || moment(now).isSame(momentDate)
  return isNotExpired;
}

export function isScheduleExpired(schedules){
  let isExpired = true;
  if(schedules && schedules.length > 0){
    for(let index in schedules){
      let dayEnd = schedules[index].dayEnd;
      if( isNotExpired(dayEnd) ){
        isExpired = false;
      }
    }
  }
  return isExpired;
}


function checkMounted(cb, _this){
  if(_this.mounted){
    cb();
  }
}

export function AddListeners(store, listnerNames, sectionName, _this){
  for(let i=0; i < listnerNames.length; i++){
    let listnerName = listnerNames[i];

    let addName = 'add' + listnerName;
    let fctName = '__'  + listnerName + sectionName;
    
    let fctListner = 
      function(){
        return checkMounted( _this[ fctName ].bind(_this), _this);
      }.bind(_this)

    //store[ addName ]( _this[ fctName ].bind(_this) );
    store[ addName ]( fctListner );
  }
}