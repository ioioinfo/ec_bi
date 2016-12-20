var _ = require('lodash');
var r = require('request');
var moment = require('moment');
var EventProxy = require('eventproxy');

var moduel_prefix = 'ioio_ec_bi';

exports.register = function(server, options, next) {
    var _ = require('lodash');

    var service_info = `ec bi service`;

    server.route([
        {
            method: 'GET',
            path: '/desc',
            handler: function(request, reply) {
                return reply({"success":true,"message":"ok","desc":"ioio ec bi service","service_info":service_info});
            },
        },
        
        {
            method: 'GET',
            path: '/get_product_sales',
            handler: function(request, reply) {
                var product_id = request.query.product_id;

                // require field check
                if (!product_id) {
                    return reply({success:false,message:"product id is null",service_info:service_info});
                }
                
                server.plugins.models.sales.get_product_sales(product_id,function(err,rows) {
                    var row = {};
                    if (rows && rows.length > 0) {
                        row = rows[0];   
                    }
                    return reply({success:true,message:"ok",row:row,service_info:service_info});
                });
            },
        },

        // 商品评价汇总
        {
            method: 'GET',
            path: '/get_product_comments_summary',
            handler: function(request, reply) {
                var product_id = request.query.product_id;

                // require field check
                if (!product_id) {
                    return reply({success:false,message:"product id is null",service_info:service_info});
                }
                
                server.plugins.models.product.get_product_comments_summary(product_id,function(err,rows) {
                    var row = {};
                    if (rows && rows.length > 0) {
                        row = rows[0];   
                    }
                    return reply({success:true,message:"ok",row:row,service_info:service_info});
                });
            },
        },
        
    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};