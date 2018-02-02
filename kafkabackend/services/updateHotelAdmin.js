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

    var hotelListingObject = {
        _id : msg._id,
        hotel_name : msg.hotel_name,
        address : {
            street: msg.street,
            state : msg.state,
            zip_code : msg.zip_code,
            city : msg.city,
            country: "US"
        },
        stars: msg.stars,
        rooms : [
            {
                room_type: msg.room_type_value1,
                room_price: msg.room_price_value1
            },
            {
                room_type: msg.room_type_value2,
                room_price: msg.room_price_value2
            },
            {
                room_type: msg.room_type_value3,
                room_price: msg.room_price_value3
            }
        ]
    };


    var listingObj = {
        listing_type: "Hotel",
        hotel:hotelListingObject
    };

    var hotelInstance = new hotelListings(listingObj);

    console.log("Hotel--in"+hotelInstance);
    hotelListings.findByIdAndUpdate(msg._id, {$set: listingObj}, function(err, hotelDocument, numAffected) {
        if (err) {
            console.log("Some Error Happened while updating Hotel Data");
            res.code = "500";
            res.data = err;
            callback(null, res);
        }
        else {
            message = numAffected + " rows updated in Hotel Listing\n" + hotelDocument;
            console.log(message);
            res.code = "201";
            res.data = hotelDocument;
            callback(null, res);
        }
    });

}
exports.handle_request = handle_request;