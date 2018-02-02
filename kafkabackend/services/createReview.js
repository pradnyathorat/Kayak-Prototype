var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
//mongoose.connect('localhost:27017/kayak');
mongoose.connect('54.183.101.173:27017/kayak');
var Reviews = require('../models/Review');

function handle_request(msg, callback) {

    var res = {};
    var message = "";
    console.log("In handle request:"+ JSON.stringify(msg));
    var hotelListingObject = {
    };

    var reviewObj = {
    };

    var reviewInstance = new Reviews(msg);
    reviewInstance.save(function (err, reviewDocument, numAffected) {
        if (err) {
            console.log("Some Error Happened while Inserting Review Data");
            res.code = "500";
            res.data = err;
            callback(null, res);
        }
        else {
            message = numAffected + " rows added into Review\n" + reviewDocument;
            console.log(message);
            res.code = "201";
            res.data = reviewDocument;
            callback(null, res);
        }
    });
}
exports.handle_request = handle_request;