var Collection = require('./collection');
var work_model = require('./work_model');

module.exports = Collection.extend({
  model: work_model,

  url: '../json/work.json',

  initialize: function() {
    this.fetch({add: true});
  },

  parse: function(resp) {
    var self = this;
    _.each(resp.works, function(work) {
      self.push(new work_model({
        id: work.id,
        title: work.title
      }));
    });
    this.trigger('parsedWorks');
  },

  getAllWork: function() {
    return this;
  },

  getOneWork: function(id) {
    return this.get(id);
  }

});