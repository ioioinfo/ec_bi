var _ = require('lodash');
var r = require('request');
var uu_request = require('../utils/uu_request');
var moment = require('moment');
var EventProxy = require('eventproxy');

var moduel_prefix = 'ioio_ec_bi';

exports.register = function(server, options, next) {
    var _ = require('lodash');

    var service_info = `ec bi service`;
    
    //查询商品信息
    var get_products_by_ids = function(product_ids,cb) {
        var url = "http://211.149.248.241:18002/find_products_with_picture?product_ids="+product_ids;
        uu_request.do_get_method(url,function(err,content) {
            cb(err,content);
        });
    };

    server.route([
        {
            method: 'GET',
            path: '/desc',
            handler: function(request, reply) {
                return reply({"success":true,"message":"ok","desc":"ioio ec bi service","service_info":service_info});
            },
        },
        
        //产品销量
        {
            method: 'GET',
            path: '/get_product_sales',
            handler: function(request, reply) {
                var product_id = request.query.product_id;
                
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
            path: '/get_products_comment_summary',
            handler: function(request, reply) {
                var str_product_ids = request.query.product_ids;

                // require field check
                if (!str_product_ids) {
                    return reply({success:false,message:"params product_ids is null",service_info:service_info});
                }
                
                var product_ids = JSON.parse(str_product_ids);
                if (product_ids && product_ids.length == 0) {
                    return reply({success:true,message:"ok",rows:[],service_info:service_info});
                }
                
                server.plugins.models.product.get_products_comment_summary(product_ids,function(err,rows) {
                    _.each(rows,function(row) {
                        //计算好评率
                        row.good_rate_text = (row.good_comment*100/row.total_number).toFixed(0) + "%";
                    });
                    
                    return reply({success:true,message:"ok",rows:rows,service_info:service_info});
                });
            },
        },
        
        //猜你喜欢
        {
            method: 'GET',
            path: '/get_recommend_products',
            handler: function(request, reply) {
                var person_id = request.query.person_id;
                
                if (!person_id) {
                    return reply({success:false,message:"param person_id is null",service_info:service_info});
                }
                
                server.plugins.models.product.get_recommend_products(person_id,function(err,rows) {
                    if (rows.length == 0) {
                        return reply({success:true,message:"ok",rows:[],service_info:service_info});
                    }
                    
                    var product_ids = [];
                    _.each(rows,function(row) {
                        product_ids.push(row.product_id);
                    });
                    
                    get_products_by_ids(JSON.stringify(product_ids), function(err,content) {
                        return reply({success:true,message:"ok",rows:content.products,service_info:service_info});
                    });
                });
            },
        },
        
        //热销产品
        {
            method: 'GET',
            path: '/get_hot_sale_products',
            handler: function(request, reply) {
                var person_id = request.query.person_id;
                
                if (!person_id) {
                    return reply({success:false,message:"param person_id is null",service_info:service_info});
                }
                
                server.plugins.models.product.get_hot_sale_products(person_id,function(err,rows) {
                    if (rows.length == 0) {
                        return reply({success:true,message:"ok",rows:[],service_info:service_info});
                    }
                    
                    var product_ids = [];
                    _.each(rows,function(row) {
                        product_ids.push(row.product_id);
                    });
                    
                    get_products_by_ids(JSON.stringify(product_ids), function(err,content) {
                        return reply({success:true,message:"ok",rows:content.products,service_info:service_info});
                    });
                });
            },
        },
        
        //新品到货
        {
            method: 'GET',
            path: '/get_new_arrival_products',
            handler: function(request, reply) {
                var person_id = request.query.person_id;
                
                if (!person_id) {
                    return reply({success:false,message:"param person_id is null",service_info:service_info});
                }
                
                server.plugins.models.product.get_new_arrival_products(person_id,function(err,rows) {
                    if (rows.length == 0) {
                        return reply({success:true,message:"ok",rows:[],service_info:service_info});
                    }
                    
                    var product_ids = [];
                    _.each(rows,function(row) {
                        product_ids.push(row.product_id);
                    });
                    
                    get_products_by_ids(JSON.stringify(product_ids), function(err,content) {
                        return reply({success:true,message:"ok",rows:content.products,service_info:service_info});
                    });
                });
            },
        },
        
    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};