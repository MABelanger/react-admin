'use strict';

import CommonConstants                from '../commonConstants';

export default {
  URL_API : CommonConstants.BASE_URL_API,
  LOGIN_URL: CommonConstants.BASE_URL_PUBLIC_API + '/sessions/authentication',
  SEND_LOGIN: 'SEND_LOGIN',
  LOGOUT:'LOGOUT',
  DONE_LOGIN: 'DONE_LOGIN',
  CHANGE_EVENT: 'CHANGE_EVENT'
};