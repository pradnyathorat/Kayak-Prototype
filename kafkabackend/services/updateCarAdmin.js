var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
//mongoose.connect('localhost:27017/kayak');
mongoose.connect('54.183.101.173:27017/kayak');
var carListings = require('../models/Listings');


function handle_request(msg, callback) {

    var res = {};
    var message = "";
    console.log("In handle request:"+ JSON.stringify(msg));

    var carListingObject = {
        _id : msg._id,
        car_name : msg.car_name,
        car_type : msg.car_type,
        model_name : msg.model_name,
        car_rental_price : msg.car_rental_price,
        city: msg.city,
        specification : {
            no_of_passengers:msg.no_of_passengers,
            luggage_capacity:msg.luggage_capacity,
            ac:msg.ac
        }
    };


    var listingObj = {
        listing_type: "Car",
        car:carListingObject
    };

    var carInstance = new carListings(listingObj);
    carListings.findByIdAndUpdate(msg._id, {$set: listingObj}, function (err, carDocument, numAffected) {
        if (err) {
            console.log("Some Error Happened while updating Car Data");
            res.code = "500";
            res.data = err;
            callback(null, res);
        }
        else {
            message = numAffected + " rows update in Car Listing\n" + carDocument;
            console.log(message);
            res.code = "201";
            res.data = carDocument;
            callback(null, res);
        }
    });
}
exports.handle_request = handle_request;