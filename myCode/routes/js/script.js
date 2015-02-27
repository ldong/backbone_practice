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

  App.Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'show/:id': 'show',
      'download/*filename': 'download',
      'search/:query': 'search',
      '*other': 'default'
    },

    index: function(){
      console.log('Hi from index');
    },

    show: function(id){
      console.log('Hi from show with id: ' +id);
    },

    download: function(filename){
      console.log('Hi from filename '+ filename);
    },

    search: function(query){
      console.log('Hi from query: '+query);
    },

    default: function(other){
      console.log('??');
    }

  });

  new App.Router;
  Backbone.history.start();

}());
