

"use strict";

const days = [
  {name:'lundi', _id:0},
  {name:'mardi', _id:1},
  {name:'mercredi', _id:2},
  {name:'jeudi', _id:3},
  {name:'vendredi', _id:4},
  {name:'samedi', _id:5},
  {name:'dimanche', _id:6}
];

// TODO : change this module to object and constructor... es6.


var CommonApi = {

  /**
   * Read
   **/
  getDays: function(){
    var promise = new Promise(function(resolve, reject) {
      Request
        .get(url)
        .accept('application/json')
        .type('application/json')
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

  /*
   * Remove the document name and array position
   * from mongoose error
   * ex:. 'teachers.1.firstName' -> 'firstName'
   */
  getFlatErrors: function(errors){
    let flatErrors = {};
    for (var property in errors) {
      if (errors.hasOwnProperty(property)) {
        // 'teachers.1.firstName' -> 'firstName'
        let newProperty = property.split('.').splice(-1);
        flatErrors[newProperty] = errors[ property ];
      }
    }
    return flatErrors;
  }
};

module.exports = CommonApi;