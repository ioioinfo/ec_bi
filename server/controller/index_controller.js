var _ = require('lodash');
var r = require('request');
var uu_request = require('../utils/uu_request');
var moment = require('moment');
var EventProxy = require('eventproxy');

var moduel_prefix = 'ioio_ec_bi_index';

exports.register = function(server, options, next) {
    var service_info = `ec bi service`;
    
    server.route([
        {
            method: 'GET',
            path: '/desc',
            handler: function(request, reply) {
                return reply({"success":true,"message":"ok","desc":"ioio ec bi service","service_info":service_info});
            },
        },
        
    ]);

    next();
}

exports.register.attributes = {
    name: moduel_prefix
};