var _ = require('lodash');
var r = require('request');
var uu_request = require('../utils/uu_request');
var moment = require('moment');
var EventProxy = require('eventproxy');

var moduel_prefix = 'ioio_ec_bi_member';

exports.register = function(server, options, next) {
    var service_info = `ec bi service`;
    
    server.route([
        //获取常去门店
        {
            method: 'GET',
            path: '/list_visited_stores',
            handler: function(request, reply) {
                var person_id = request.query.person_id;
                
                if (!person_id) {
                    return reply({success:false,message:"param person_id is null",service_info:service_info});
                }
                
                server.plugins.models.member.get_visited_stores(person_id,function(err,rows) {
                    return reply({success:true,message:"ok",rows:rows,service_info:service_info});
                });
            },
        },
        
    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};