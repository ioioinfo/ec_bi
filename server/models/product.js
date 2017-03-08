var _ = require('lodash');
var EventProxy = require('eventproxy');

var nav = function(server) {
    return {
        get_products_comment_summary: function(product_ids,cb) {
            var sql = `select a.product_id,a.total_number,a.pic_comment,a.good_comment,a.normal_comment
                ,a.bad_comment
                from interaction_comments_summaries a 
                where a.product_id in (?)
            `;
        
            var params = [product_ids];
            server.plugins.mysql.query(sql, params, function(err, rows) {
                if (err) {
                    console.log(err);
                    cb(err,null);
                    return;
                }
                cb(false,rows);
            });
        },
        
        get_recommend_products: function(person_id,cb) {
            var sql = `select a.product_id
                from recommend_products a 
            `;
            
            var params = [person_id];
            server.plugins.mysql.query(sql, params, function(err, rows) {
                if (err) {
                    console.log(err);
                    cb(err,null);
                    return;
                }
                cb(false,rows);
            });
        },
        
        get_hot_sale_products: function(person_id,cb) {
            var sql = `select a.product_id
                from hot_sale_products a 
            `;
            
            var params = [person_id];
            server.plugins.mysql.query(sql, params, function(err, rows) {
                if (err) {
                    console.log(err);
                    cb(err,null);
                    return;
                }
                cb(false,rows);
            });
        },
        
        get_new_arrival_products: function(person_id,cb) {
            var sql = `select a.product_id
                from new_arrival_products a 
            `;
            
            var params = [person_id];
            server.plugins.mysql.query(sql, params, function(err, rows) {
                if (err) {
                    console.log(err);
                    cb(err,null);
                    return;
                }
                cb(false,rows);
            });
        },
    };
};

module.exports = nav;