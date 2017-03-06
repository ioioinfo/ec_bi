var _ = require('lodash');
var EventProxy = require('eventproxy');

var nav = function(server) {
    return {
        get_product_sales: function(product_id,cb) {
            var sql = `select a.total_number,a.total_sales
                ,date_format(a.updated_at,'%Y-%m-%d %H:%i:%s') updated_at
                from product_sales a 
                where a.product_id=?
            `;
        
            var params = [product_id];
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