App.Views.App = Backbone.View.extend({
  initialize: function(){
    console.log(this.collection.toJSON());
    var addContactView = new App.Views.AddContact;
  }
});

App.Views.AddContact = Backbone.View.extend({
  el: '#addContact',
  events: {
    'submit': 'addContact'
  },
  addContact: function(e){
    console.log('add contact now');
    e.preventDefault();
    this.collection.create({
      first_name: this.$('#first_name').val(),
      last_name: this.$('#last_name').val(),
      email_address: this.$('#email_address').val(),
      description: this.$('#description').val()
    }, {
      wait: true,
      error: function(){
        console.log('from error');
      },
      success: function(){
        console.log('from success');
      }
    });
    console.log(this.collection);
  }

});
