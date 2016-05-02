"use strict";

import Request                    from "superagent";

import commonApi                  from "../../commonApi";

const URL = 'http://localhost:3000/api/conferences';

// TODO : change this module to object and constructor... es6.


var ConferenceApi = {

  getIndexById: function(objs, _id) {
    let index;
    for (let i=0; i < objs.length; i++) {
      if(_id == objs[i]._id){
        index = i; 
      }
    }
    return index;
  },

  /**
   * Create
   **/
  create: function(obj) {
    var promise = new Promise(function(resolve, reject) {
      Request
        .post(URL)
        .accept('application/json')
        .type('application/json')
        .send(obj)
        .end((err, res) => {
          if (! err ) {
            resolve(res.body);
          }
          else {
            if(res) {
              reject(commonApi.getFlatErrors(res.body.errors));
            }
            reject(err);
          }
        });
    });
    return promise;
  },

  /**
   * Read
   **/
  list: function(callback) {
    Request
    .get(URL, function(err, res){
      callback(res.body);
    });
  },

  read: function(conferenceId) {
    var promise = new Promise(function(resolve, reject) {
      Request
        .get(URL + '/' + conferenceId)
        .accept('application/json')
        .type('application/json')
        .send(conference)
        .end((err, res) => {
          if (! err ) {
            resolve(res.body);
          }
          else {
            reject(err);
          }
        });
    });
    return promise;
  },



  /**
   * Update
   **/
  save: function(conference) {
    var promise = new Promise(function(resolve, reject) {
      Request
        .put(URL + '/' + conference._id)
        .accept('application/json')
        .type('application/json')
        .send(conference)
        .end((err, res) => {
          if (! err ) {
            resolve(res.body);
          }
          else {
            reject(commonApi.getFlatErrors(res.body.errors));
          }
        });
    });
    return promise;
  },

  /**
   * Delete
   **/

  delete: function(conference) {
    var promise = new Promise(function(resolve, reject) {
      Request
        .del(URL + '/' + conference._id)
        .accept('application/json')
        .type('application/json')
        .send(conference)
        .end((err, res) => {
          if (! err ) {
            resolve(res.body);
          }
          else {
            reject(err);
          }
        });
    });
    return promise;
  }
};

module.exports = ConferenceApi;