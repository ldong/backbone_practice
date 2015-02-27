var Person = Backbone.Model.extend({
    defaults: {
        name: 'John Doe',
        age: 30,
        occupation: 'worker'
    },

    validate: function(attrs){
        if(attrs.name != 'Lin Dong'){
            return 'Name is not Lin Dong';
        }

        if(!attrs.age){
            return 'Everybody should have a name';
        }
    },

    work: function(){
        return this.get('name');
    }
});

var PersonView = Backbone.View.extend({
    tagName: 'li',
    className: 'person',
    id: 'person',
    initialize : function(){
        console.log('Hi from personview');
        console.log(this.model);
        this.render();
    },
    render: function(){
        console.log('Hi from render')
        this.$el.html(this.template(this.model.toJSON()));
        $(document.body).html(this.el);
    },

    template: _.template($('#personTemplate').html())


});

$(document).ready(function(){
    /*
    console.log('Hi');
    var person = new Person({name: 'Lin Dong'});
    console.log(person.toJSON());
    person.set('name', 'Lin', { validate: true });
    console.log(person.toJSON());
    person.set('name', 'Lin');
    console.log(person.toJSON());


    var personView = new PersonView;
    console.log(personView);
    console.log(personView.el);
    console.log(personView.$el);
    */

    person = new Person;
    personView = new PersonView({model: person});
    personView.render();
});
