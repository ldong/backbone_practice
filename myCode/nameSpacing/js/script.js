(function(){

  window.App = {
    Models: {},
    Collections: {},
    Views: {}
  };

  window.template = function(id){
    return _.template( $('#'+id).html());
  };


  App.Models.Person = Backbone.Model.extend({
    defaults: {
      name: 'John Doe',
      age: 30,
      occupation: 'worker'
    }
  });

  App.Collections.People = Backbone.Collection.extend({
    model: App.Models.Person
  });

  App.Views.Person = Backbone.View.extend({
    tagName: 'li',
    className: 'person',
    id: 'person',
    template: template('personTemplate'),

    initialize : function(){
      this.render();
    },
    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  App.Views.People = Backbone.View.extend({
    tagName: 'ul',
    initialize: function(){
    },

    render: function(){
      this.collection.each(function(person){
        var personView = new App.Views.Person({model: person});
        this.$el.append(personView.render().el);
      }, this);
      return this;
    }
  });

  var peopleCollection = new App.Collections.People([
    {
      name: 'Lin Dong',
      age: '24'
    },
    {
      name: 'Shen Dong',
      age: 35
    }
  ]);

  var peopleView = new App.Views.People({collection: peopleCollection});
  $(document.body).append(peopleView.render().el);
})();
