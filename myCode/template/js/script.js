(function(){

  window.App = {
    Models: {},
    Collections: {},
    Views: {},
    Router: {}
  };

  window.template = function(id){
    return _.template( $('#'+id).html() );
  };

  var vent = _.extend({}, Backbone.Events);

  App.Views.Appointment = Backbone.View.extend({
    initialize: function(){
      vent.on('appointment:show', this.show, this);
    },

    show: function(id){
      console.log('Show Appointment with id: '+ id);
    }

  });

  App.Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'appointment/:id': 'showAppointment',
      '*other': 'default'
    },

    index: function(){
      console.log('Hi from index');
    },

    showAppointment: function(id){
      vent.trigger('appointment:show', id);
    },

    default: function(other){
      console.log('??');
    }

  });

  new App.Views.Appointment;
  new App.Router;
  Backbone.history.start();

}());
