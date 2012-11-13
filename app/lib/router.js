var application = require('application');
var WorkView = require('../views/work_view');

module.exports = Backbone.Router.extend({
  routes: {
    ''        : 'home',
    'contact' : 'contact',
    'work'    : 'work',
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
    if(id) {
      console.log(id);
    }
    var workView = new WorkView();
    $('#main').html(workView.render().el);
  }
});
