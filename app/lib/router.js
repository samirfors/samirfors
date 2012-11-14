var application = require('application'),
    WorkView    = require('../views/work_view'),
    ContactView = require('../views/contact_view'),
    DetailView  = require('../views/work_detail_view');

module.exports = Backbone.Router.extend({
  routes: {
    ''        : 'home',
    'contact' : 'contact',
    'work'    : 'work',
    'work/:id': 'detail'
  },

  initialize: function() {
    $('header').append(application.menuView.render().el);
    Backbone.Mediator.publish('router:loaded', 'myRouter');
  },

  home: function() {
    $('#main').html(application.homeView.render().el);
  },

  contact: function() {
    var contactView = new ContactView();
    $('#main').html(contactView.render().el);
  },

  work: function() {
    var workView = new WorkView();
    $('#main').html(workView.render().el);
  },

  detail: function(id) {
    var detailView = new DetailView();
    $('#main').html(detailView.render(id).el);
  }
});
