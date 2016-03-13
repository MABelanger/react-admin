http://derpturkey.com/react-pass-value-with-onclick/
https://toddmotto.com/react-create-class-versus-component/

var testingDaysSchema = new Schema({
  "slug" : String,
  "day": Date,
  "isFull": Boolean
});

/*
{
  toObject: {virtuals: true}, 
  toJSON: {virtuals: true}
});

testingDaysSchema.virtual('yyyymmdd').get(function () {
  return utils.getYYYYMMDD(this.day);
});
*/

var SchedulesSchema = new Schema({
  "slug" : String,
  "isFull": Boolean,
  "dayEnd": Date,
  "dayStart": Date,
  "dayName": String,
  "testingDays": [ testingDaysSchema ]
});

var courseTypesSchema = new Schema({
  "slug" : String,
  "name": String,
  "description": String,
  "schedules": [ SchedulesSchema ]
});

var CourseSchema = new Schema({
  "slug" : String,
  "courseType": String,
  "note": String,
  "image": String,
  "description": String,
  "price": String,
  "isVisible": Boolean,
  "courseTypes": [ courseTypesSchema ]
});

var TeachersSchema = new Schema({
  "slug" : String,
  "firstName": String,
  "lastName": String,
  "tel": String,
  "schoolName": String,
  "schoolUrl": String,
  "course": CourseSchema
});

var CourseSchemaEmbed = Schema({
  "slug" : String,
  "name" : String,
  "svg": String,
  "teachers" : [ TeachersSchema ]
}); // courseSchema