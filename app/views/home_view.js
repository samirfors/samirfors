var View = require('./view');
var template = require('./templates/home');

module.exports = View.extend({
  id: 'home-view',
  template: template,

  subscriptions: {
    'router:loaded': 'enable', // calls this.enable
  },

  enable: function(args) {
    console.log('enable: ' + args);
  },

  initialize: function() {

  }
});
