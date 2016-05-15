'use strict';

import { useRouterHistory } from 'react-router'
import { createHistory, createHashHistory } from 'history'

export function isProduction() {
  console.log('window.location.hostname', window.location.hostname);
  return    window.location.hostname == 'ec2-54-235-235-7.compute-1.amazonaws.com'
        ||  window.location.hostname == 'mondeavie.ca'
        ||  window.location.hostname == 'admin.blackandrouge.com'
}

export function getBaseUrlApi() {
  if( isProduction() ){
    return 'http://admin.blackandrouge.com/api';
  } else {
    return 'http://localhost:3000/api';
  }
}

export function getBaseUrlImage() {
  if( isProduction() ){
    return 'http://www.blackandrouge.com';
  } else {
    return 'http://localhost:3000';
  }
}

export function getUrlPublicApi() {
  if( isProduction() ){
    return 'http://admin.blackandrouge.com/public/api';
  } else {
    return 'http://localhost:3000/public/api';
  }
}

export function getHistory() {
  if( isProduction() ){
    let  browserHistory = useRouterHistory(createHistory)({ basename: '/' });
    return browserHistory;

  } else {
    let  hashHistory = useRouterHistory(createHashHistory)({ basename: '/' });
    return hashHistory;
  }
}