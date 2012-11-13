(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"application": function(exports, require, module) {
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
      this.contactView    = new ContactView();
      this.menuView       = new MenuView();
      this.homeView       = new HomeView();
      this.router         = new Router();
      if (typeof Object.freeze === 'function') Object.freeze(this);
    }
  }

  module.exports = Application;
  
}});

window.require.define({"initialize": function(exports, require, module) {
  var application = require('application');

  $(function() {
    application.initialize();
    Backbone.history.start();
  });
  
}});

window.require.define({"lib/router": function(exports, require, module) {
  var application = require('application');
  var WorkView = require('../views/work_view');

  module.exports = Backbone.Router.extend({
    routes: {
      ''        : 'home',
      'contact' : 'contact',
      'work'    : 'work',
      'work/:id': 'work'
    },

    initialize: function() {
      $('header').append(application.menuView.render().el);
    },

    home: function() {
      $('#main').html(application.homeView.render().el);
    },

    contact: function() {
      $('#main').html(application.contactView.render().el);
    },

    work: function(id) {
      if(id) {
        console.log(id);
      }
      var workView = new WorkView();
      $('#main').html(workView.render().el);
    }
  });
  
}});

window.require.define({"lib/view_helper": function(exports, require, module) {
  // Put your handlebars.js helpers here.
  
}});

window.require.define({"models/collection": function(exports, require, module) {
  // Base class for all collections.
  module.exports = Backbone.Collection.extend({
    
  });
  
}});

window.require.define({"models/model": function(exports, require, module) {
  // Base class for all models.
  module.exports = Backbone.Model.extend({

  });
  
}});

window.require.define({"models/work_collection": function(exports, require, module) {
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
}});

window.require.define({"models/work_model": function(exports, require, module) {
  var Model = require('./model');

  module.exports = Model.extend({
    id: null,
    title: null
  });
}});

window.require.define({"views/contact_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/contact');

  module.exports = View.extend({
    id: 'contact-view',
    template: template
  });
  
}});

window.require.define({"views/home_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/home');

  module.exports = View.extend({
    id: 'home-view',
    template: template
  });
  
}});

window.require.define({"views/menu_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/menu');

  module.exports = View.extend({
    id: 'menu-view',
    tagName: 'nav',
    className: 'span6',
    template: template
  });
  
}});

window.require.define({"views/templates/contact": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"content\">\n  <ul>\n    <li>Phone: 012931</li>\n  </ul>\n</div>";});
}});

window.require.define({"views/templates/home": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"content\">\n  <p>This is home</p>\n</div>\n";});
}});

window.require.define({"views/templates/menu": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<ul>\n  <li><a href=\"/#\">Home</a></li>\n  <li><a href=\"/#contact\">Contact</a></li>\n  <li><a href=\"/#work\">Work</a></li>\n</ul>\n";});
}});

window.require.define({"views/templates/work": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

  function program1(depth0,data) {
    
    var buffer = "", stack1, stack2;
    buffer += "\n<ul>\n  ";
    foundHelper = helpers.works;
    stack1 = foundHelper || depth0.works;
    stack2 = helpers.each;
    tmp1 = self.program(2, program2, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n</ul>\n";
    return buffer;}
  function program2(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n    <li><a href=\"/#works/";
    foundHelper = helpers.id;
    stack1 = foundHelper || depth0.id;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "id", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\">";
    foundHelper = helpers.title;
    stack1 = foundHelper || depth0.title;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</a></li>\n  ";
    return buffer;}

  function program4(depth0,data) {
    
    
    return "\n\nNo works\n\n";}

    buffer += "<h2>My works</h2>\n";
    foundHelper = helpers.works;
    stack1 = foundHelper || depth0.works;
    stack2 = helpers['if'];
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.program(4, program4, data);
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    return buffer;});
}});

window.require.define({"views/templates/workLi": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


    buffer += "<li>\n  ";
    foundHelper = helpers.title;
    stack1 = foundHelper || depth0.title;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\n</li>";
    return buffer;});
}});

window.require.define({"views/view": function(exports, require, module) {
  require('lib/view_helper');

  // Base class for all views.
  module.exports = Backbone.View.extend({
    initialize: function() {
      this.render = _.bind(this.render, this);
    },

    template: function() {},
    getRenderData: function() {
    },

    render: function() {
      this.$el.html(this.template(this.getRenderData()));
      this.afterRender();
      return this;
    },

    afterRender: function() {}
  });
  
}});

window.require.define({"views/work_view": function(exports, require, module) {
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
  
}});

