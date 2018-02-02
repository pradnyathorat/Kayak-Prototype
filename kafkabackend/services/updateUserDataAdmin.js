var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
//mongoose.connect('localhost:27017/kayak');
mongoose.connect('54.183.101.173:27017/kayak');
var Users = require('../models/Users');


function handle_request(msg, callback) {

    var res = {};
    var message = "";
    console.log("In handle request:"+ JSON.stringify(msg));

    var userObject = {
        email : msg.email,
        first_name : msg.first_name,
        middle_name : msg.middle_name,
        last_name : msg.last_name,
        address : {
            street: msg.street,
            state : msg.state,
            zip_code : msg.zip_code,
            city : msg.city,
            country: "US"
        },
        phone : msg.phone
    };

    var condition = {
        email: msg.email
    };
    var updateCol = {$set: userObject};

    Users.update(condition, updateCol, function(err, userDocument, numAffected) {
        if (err) {
            console.log("Some Error Happened while updating user Data");
            res.code = "500";
            res.data = err;
            callback(null, res);
        }
        else {
            message = numAffected + " rows updated in user Listing\n" + userDocument;
            console.log(message);
            res.code = "201";
            res.data = userDocument;
            callback(null, res);
        }
    });
}
exports.handle_request = handle_request;