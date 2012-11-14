var View = require('./view');
var template = require('./templates/work_detail');

module.exports = View.extend({
  id: 'work-detail-view',
  template: template,

  elems: {},

  events: {},

  initialize: function() {
    _.bindAll(this);
  },

  render: function(id) {
    this.$el.html(this.template({
      id: id
    }));
    return this;
  }
});
