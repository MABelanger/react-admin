'use strict';

let BASE_URL = 'http://localhost:3000/';

export default {
  URL: BASE_URL + 'api/conferences',
  CREATE_SCHEDULE_EVENT: 'CREATE_SCHEDULE_EVENT',
  READ_SCHEDULE_EVENT: 'READ_SCHEDULE_EVENT',
  SAVE_SCHEDULE_EVENT: 'SAVE_SCHEDULE_EVENT',
  DELETE_SCHEDULE_EVENT: 'DELETE_SCHEDULE_EVENT',
  LIST_SCHEDULE_EVENT: 'LIST_SCHEDULE_EVENT',

  // trigger when success or errors
  SAVED_SCHEDULE_EVENT: 'SAVED_SCHEDULE_EVENT',
  DELETED_SCHEDULE_EVENT: 'DELETED_SCHEDULE_EVENT',
  ERROR_SAVE_SCHEDULE_EVENT: 'ERROR_SAVE_SCHEDULE_EVENT',
  ERROR_DELETE_SCHEDULE_EVENT: 'ERROR_DELETE_SCHEDULE_EVENT'
};