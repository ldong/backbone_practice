$(document).ready(function(){
  var Person = Backbone.Model.extend({
    defaults: {
      name: 'John Doe',
      age: 30,
      occupation: 'worker'
    }
  });

  var PeopleCollection = Backbone.Collection.extend({
    model: Person
  });

  var PersonView = Backbone.View.extend({
    tagName: 'li',
    className: 'person',
    id: 'person',
    template: _.template($('#personTemplate').html()),

    initialize : function(){
      this.render();
    },
    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  var PeopleView = Backbone.View.extend({
    tagName: 'ul',
    initialize: function(){
    },

    render: function(){
      this.collection.each(function(person){
        var personView = new PersonView({model: person});
        this.$el.append(personView.render().el);
      }, this);
      return this;
    }
  });

  var peopleCollection = new PeopleCollection([
    {
      name: 'Lin Dong',
      age: '24'
    },
    {
      name: 'Shen Dong',
      age: 35
    }
  ]);

  var peopleView = new PeopleView({collection: peopleCollection});
  $(document.body).append(peopleView.render().el);
});
