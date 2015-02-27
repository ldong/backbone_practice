App.Models.Contact = Backbone.Model.extend({
  validate: function(attrs){
    if(!attrs.first_name || !attrs.last_name){
      return 'first_name and last_name are required';
    }
  }

})
