var application = require('application');

module.exports = Backbone.Router.extend({
  routes: {
    ''        : 'home',
    'contact' : 'contact',
    'work/:id': 'work'
  },

  initialize: function() {
    $('header').append(application.menuView.render().el);
  },

  home: function() {
    $('#main').html(application.homeView.render().el);
  },

  contact: function() {
    $('#main').html(application.contactView.render().el);
  },

  work: function(id) {
    console.log(id);
  }
});
