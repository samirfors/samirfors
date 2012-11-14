// Application bootstrapper.
Application = {
  initialize: function() {
    var HomeView = require('views/home_view'),
        MenuView = require('views/menu_view'),
        Router = require('lib/router');
    // Ideally, initialized classes should be kept in controllers & mediator.
    // If you're making big webapp, here's more sophisticated skeleton
    // https://github.com/paulmillr/brunch-with-chaplin
    this.menuView = new MenuView();
    this.homeView = new HomeView();
    this.router   = new Router();
    if (typeof Object.freeze === 'function') Object.freeze(this);
  }
}

module.exports = Application;
