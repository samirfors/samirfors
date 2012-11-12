var application = require('application');

module.exports = Backbone.Router.extend({
  routes: {
    '': 'home'
  },

  home: function() {
    $('#main').html(application.homeView.render().el);
  }
});
