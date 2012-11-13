var View = require('./view');
var template = require('./templates/work');
var WorkCollection = require('../models/work_collection');

module.exports = View.extend({
  id: 'work-view',
  template: template,

  elems: {},

  events: {},

  initialize: function() {
    _.bindAll(this);
    this.collection = new WorkCollection();
    this.collection.bind('parsedWorks', this.render, this);
  },

  getRenderData: function() {
    return {
      works: this.collection.toJSON()
    };
  }

});
