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

    hotelListings.find({"listing_type" : "Hotel"} , {hotel : 1} , function(err, hotelDocuments) {
        if (err) {
            console.log("Some Error Happened while getting Hotel Data");
            res.code = "500";
            res.data = err;
            callback(null, res);
        }
        else {

            var hotelFrontEnd = [];
            hotelDocuments.map(hotel=>{
                var ob = {};

                ob = {_id:hotel._id,
                    hotel_name:hotel.hotel.hotel_name,
                    stars:hotel.hotel.stars,
                    street:hotel.hotel.address.street,
                    state:hotel.hotel.address.state,
                    city:hotel.hotel.address.city,
                    zip_code:hotel.hotel.address.zip_code,
                    room_type_value1:hotel.hotel.rooms[0].room_type,
                    room_price_value1:hotel.hotel.rooms[0].room_price,
                    room_type_value2:hotel.hotel.rooms[1].room_type,
                    room_price_value2:hotel.hotel.rooms[1].room_price,
                    room_type_value3:hotel.hotel.rooms[2].room_type,
                    room_price_value3:hotel.hotel.rooms[2].room_price
                };
                hotelFrontEnd.push(ob);
            });


            console.log("Temp"+JSON.stringify(hotelFrontEnd));
            message = " Hotel Listing\n" + hotelDocuments;
            //console.log(message);
            res.code = "201";
            res.data = hotelFrontEnd;
            callback(null, res);
        }
    }).limit(100);

}
exports.handle_request = handle_request;