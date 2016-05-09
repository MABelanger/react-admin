'use strict';

let BASE_URL = 'http://localhost:3000/';

export default {
  URL: BASE_URL + 'public/api/courses',
  CREATE_EVENT: 'CREATE_EVENT',
  READ_EVENT: 'READ_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
  DESTROY_EVENT: 'DESTROY_EVENT',
  READ_EVENT: 'READ_EVENT',
  LIST_EVENT: 'LIST_EVENT',

  // trigger when errors
  FAIL_TO_CREATE_EVENT: 'FAIL_TO_CREATE_EVENT',
};