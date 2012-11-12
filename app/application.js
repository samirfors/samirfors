// Application bootstrapper.
Application = {
  initialize: function() {
    var HomeView = require('views/home_view'),
        ContactView = require('views/contact_view'),
        MenuView = require('views/menu_view'),
        WorkView = require('views/work_view'),
        WorkCollection = require('models/work_collection'),
        Router = require('lib/router');
    // Ideally, initialized classes should be kept in controllers & mediator.
    // If you're making big webapp, here's more sophisticated skeleton
    // https://github.com/paulmillr/brunch-with-chaplin
    this.contactView = new ContactView();
    this.menuView = new MenuView();
    this.workView = new WorkView({
        collection: new WorkCollection()
    });
    this.homeView = new HomeView();
    this.router = new Router();
    if (typeof Object.freeze === 'function') Object.freeze(this);
  }
}

module.exports = Application;
