App.Views.App = Backbone.View.extend({
  initialize: function(){
    console.log(this.collection.toJSON());
    var addContactView = App.Views.AddContact;
  }
});

App.Views.AddContact = Backbone.View.extend({

  el: '#addContact',

  events: {
    'submit' : 'addContact'
  },

  addContact: function(e){
    e.preventDefault();
    console.log('Add contact now');
  }
});
