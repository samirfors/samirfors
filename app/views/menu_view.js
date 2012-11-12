var View = require('./view');
var template = require('./templates/menu');

module.exports = View.extend({
  id: 'menu-view',
  tagName: 'nav',
  className: 'span12',
  template: template
});
