(function(){

  window.App = {
    Models: {},
    Collections: {},
    Views: {}
  };

  window.template = function(id){
    return _.template( $('#'+id).html() );
  };

  App.Models.Task = Backbone.Model.extend({
    validate: function(attrs){
      if(!attrs.title){
        return 'A taks requires a valid title';
      }
    }
  });

  App.Collections.Tasks = Backbone.Collection.extend({
    model: App.Models.Task
  })

  App.Views.Task = Backbone.View.extend({
    tagName: 'li',

    template: template('taskTemplate'),

    initialize: function(){
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.destroy, this);
      // or
      // _.bindAll(this, 'editTask', 'render';
    },

    events: {
      'click .edit': 'editTask',
      'click .delete': 'destroyTask'
    },

    editTask: function(){
      console.log(this.model.get('title'));
      var newTaskTitle = prompt('What would you like to change the next task to?',
                           this.model.get('title'));
      this.model.set('title', $.trim(newTaskTitle), {validate: true});
    },


    destroyTask: function(){
      this.model.destroy();
    },

    destroy: function(){
      this.$el.remove();
    },


    render: function(){
      var template = this.template(this.model.toJSON());
      this.$el.html(template);
      return this;
    }
  });

  App.Views.Tasks = Backbone.View.extend({
    tagName: 'ul',

    initialize: function(){
      this.collection.on('add', this.addOne, this);
      var that = this;
      this.listenTo(Backbone.Events, 'tasks:add', function(task) {
        that.addOne(task);
      });
    },

    render: function(){
      this.collection.each(this.addOne, this);
      return this;
    },

    addOne: function(task){
      var taskView = new App.Views.Task({model: task});
      this.$el.append(taskView.render().el);
    }
  });


  App.Views.AddTask = Backbone.View.extend({
    el: '#addTask',
    initialize: function(){
      // console.log(this.el.innerHTML);
    },

    events: {
      'submit': 'submit'
    },

    submit: function(e){
      e.preventDefault();
      var newTaskTitle = $(e.currentTarget).find('input[type=text]').val();
      console.log(newTaskTitle);
      var task = new App.Models.Task({title: newTaskTitle});
      Backbone.Events.trigger('tasks:add', task);
      // this.collection.add(task);
    }
  });

  var tasks = new App.Collections.Tasks([
    {
      title: 'Go shopping',
      priority: 4
    },
    {
      title: 'Buy food',
      priority: 5
    }
  ]);

  var tasksView = new App.Views.Tasks({collection: tasks});
  $('.tasks').html(tasksView.render().el);

  new App.Views.AddTask({collection: tasks});

})();


/*
(function(){
  var app = function(){
    this.a = 10;
    var c = 20;
    var that = this;
    var b = function(){
      console.log(c);
      console.log(that.a);
      console.log(this.a);
    };
    console.log(this.a);
    // b.apply(this);
    b();
  }
  var a = new app;

})();
*/
