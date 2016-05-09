    todos: function() {
      return _todos;
    },
    new: function() {
      return {
        id: null,
        title: null
      }
    },
    all: function() {
      this.triggerChange();
    },
    create: function(todo) {
      console.log("creating a todo");
      todo.id = _todos.length + 1;
      _todos.push(todo);
      this.triggerChange(todo);
    },
    update: function(todo) {
      var index = this.find(todo.id);
      todo.id = parseInt(todo.id);
      if(index === undefined) return this.triggerFailToTakeAction();
      _todos[index] = todo;
      this.triggerChange();
    },
    destroy: function(id) {
      var index = this.find(id);
      if(index === undefined) return this.triggerFailToTakeAction();
      _todos.splice(index, 1);
      this.triggerChange();
    },

    find: function(id) {
      var id = parseInt(id);
      var found = undefined;
      _todos.some(function(todo, i) {
        if(todo.id === id) found = i;
      });
      return found;
    },