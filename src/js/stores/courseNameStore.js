"use strict";

// Flux CourseNameStore
import AppDispatcher                  from '../dispatcher/clientDispatcher';
import CourseNameConstants            from '../constants/courseNameConstants';
import { EventEmitter }               from 'events';

const LIST_EVENT = CourseNameConstants.LIST_EVENT;


// Define the public event listeners and getters that
// the views will use to listen for changes and retrieve
// the store
class CourseNameStoreClass extends EventEmitter {

  constructor() {
    super();
    this.courseNames = [];
    this.courseName = {};
  }

  /* 
   * public methods
   */
  setCourseNames(courseNames){
    this.courseNames = courseNames;
  }

  setCourseName(courseName){
    this.courseName = courseName;
  }

  getCourseNames(){
    return this.courseNames;
  }

  getCourseName(){
    return this.courseName;
  }

  // new(){
  //   return {
  //     id: null,
  //     title: null
  //   }
  // }

  list(){
    this.emitList();
  }

  /*
   CRUD operations
   */
  create(todo) {
    console.log("creating a todo");
    todo.id = _todos.length + 1;
    _todos.push(todo);
    this.emitList(todo);
  }

  update(todo) {
    var index = this.find(todo.id);
    todo.id = parseInt(todo.id);
    if(index === undefined) return this.triggerFailToTakeAction();
    _todos[index] = todo;
    this.emitList();
  }

  delete(id) {
    var index = this.find(id);
    if(index === undefined) return this.triggerFailToTakeAction();
    _todos.splice(index, 1);
    this.emitList();
  }

  find(id) {
    var id = parseInt(id);
    var found = undefined;
    _todos.some(function(todo, i) {
      if(todo.id === id) found = i;
    });
    return found;
  }


  /*
   * LIST
   */
  addListListener(cb) {
    this.on(LIST_EVENT, cb);
  }
  removeListListener(cb) {
    this.removeListener(LIST_EVENT, cb);
  }
  emitList(){
    this.emit(LIST_EVENT);
  }







}



// Initialize the singleton to register with the
// dispatcher and export for React components
const courseNameStore = new CourseNameStoreClass();

// Register each of the actions with the dispatcher
// by changing the store's data and emitting a
// change
AppDispatcher.register((payload) => {
  switch (payload.actionType) {

  case CourseNameConstants.LIST_EVENT:

    courseNameStore.setCourseNames(payload.courseNames);
    courseNameStore.emit(LIST_EVENT);
    break;

  default:
    return true;
  }
});

export default courseNameStore;
