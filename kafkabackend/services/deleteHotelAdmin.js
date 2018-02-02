var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
//mongoose.connect('localhost:27017/kayak');
mongoose.connect('54.183.101.173:27017/kayak');
var hotelListings = require('../models/Listings');


function handle_request(msg, callback) {

    var res = {};
    var message = "";
    console.log("In handle request:"+ JSON.stringify(msg));

    hotelListings.findByIdAndRemove(msg._id, function(err, result) {
        if (err) {
            console.log("Some Error Happened while deleting Hotel Data");
            res.code = "500";
            res.data = err;
            callback(null, res);
        }
        else {
            console.log("Deleted Hotel Data");
            res.code = "201";
            res.data = result;
            callback(null, res);
        }
    });

}
exports.handle_request = handle_request;