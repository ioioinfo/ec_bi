var _ = require('lodash');
var EventProxy = require('eventproxy');

var nav = function(server) {
    return {
        get_visited_stores: function(person_id,cb) {
            var sql = `select a.store_id
                from visited_stores a 
                where a.person_id=?
            `;
        
            var params = [person_id];
            server.plugins.mysql.query(sql, params, function(err, rows) {
                if (err) {
                    console.log(err);
                    cb(err,nil);
                    return;
                }
                cb(false,rows);
            });
        },
    };
};

module.exports = nav;