//var Collection = require('./collection');
var work_model = require('./work_model');

module.exports = Backbone.Collection.extend({
  model: work_model,

  url: '../json/work.json',

  initialize: function() {
    console.log('work collection init');
    this.fetch({add: true});
    //this.getAllWork();
    console.log(this);
  }

  // getAllWork: function() {
  //   var self = this;
  //   $.getJSON('../json/work.json', function(data) {
  //      _.each(data.works, function(work) {
  //        self.push(new work_model({id:work.id, name:work.title}));
  //      });
  //    });
  // }
});