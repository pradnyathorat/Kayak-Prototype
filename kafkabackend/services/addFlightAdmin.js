var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
//mongoose.connect('localhost:27017/kayak');
mongoose.connect('54.183.101.173:27017/kayak');
var flightListings = require('../models/Listings');


function handle_request(msg, callback) {

    var res = {};
    var message = "";
    console.log("In handle request:"+ JSON.stringify(msg));

    var flightListingObject = {
        flight_name : msg.flight_name,
        flight_operator_name : msg.flight_operator_name,
        departure_date : msg.departure_date,
        arrival_date : msg.arrival_date,
        origin : msg.origin,
        destination : msg.destination,
        classes :[
            {
                class_type : "Business",
                class_price : msg.business_class_price

            },
            {
                class_type : "Economy",
                class_price : msg.economy_class_price
            },
            {
                class_type : "First Class",
                class_price : msg.first_class_price
            }
        ]
    };


    var listingObj = {
        listing_type: "Flight",
        flight : flightListingObject
    };

    var flightInstance = new flightListings(listingObj);
    flightInstance.save(function (err, flightDocument, numAffected) {
        if (err) {
            console.log("Some Error Happened while Inserting Flight Data");
            res.code = "500";
            res.data = err;
            callback(null, res);
        }
        else {
            message = numAffected + " rows added into Flight Listing\n" + flightDocument;
            console.log(message);
            res.code = "201";
            res.data = flightDocument;
            callback(null, res);
        }
    });
}
exports.handle_request = handle_request;