var mongoose = require('mongoose');
mongoose.connect('54.183.101.173:27017/kayak');
var Users = require('../models/Users')
const {ObjectId} = require('mongodb');

function handle_request(msg, callback) {
    var res = {};
    var message = "";
    var userId = msg.userId;

    console.log("In handle request:"+ JSON.stringify(msg));

    Users.update(
        {_id:ObjectId(userId)},
        {$set: { active:false}},
        {new:true},
        function(err, flights){
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else
            {
                message=flights;
                res.code = "201"
                res.data = message;

                callback(null, res);
            }
        })
}

exports.handle_request = handle_request;