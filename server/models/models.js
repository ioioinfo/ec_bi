// Base routes for default index/root path, about page, 404 error pages, and others..
exports.register = function(server, options, next){

    var load_model = function(key, path) {
        var model = require(path)(server);
        if (typeof model.init === 'function') { model.init(); }
        if (typeof model.refresh === 'function') { model.refresh(); }
        server.expose(key, model);
    };

  load_model('sales', './sales.js');
  load_model('product', './product.js');
  load_model('member', './member.js');
  
  next();
}

exports.register.attributes = {
    name: 'models'
};