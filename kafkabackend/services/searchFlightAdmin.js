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

    if(msg.flight_name == ""){
        var cond={"listing_type" : "Flight"};
    }
    else{
        var cond = {$and : [ { "flight.flight_name": {'$regex':"^"+msg.flight_name+"+",$options:'m',$options:'i'}}, {"listing_type" : "Flight"}]};
    }
    

    flightListings.find( cond, {flight : 1} , function(err, flightDocuments) {
        if (err) {
            console.log("Some Error Happened while getting Flight Data");
            res.code = "500";
            res.data = err;
            callback(null, res);
        }
        else {

            var flightFrontEnd = [];
            flightDocuments.map(flight=>{
                var ob = {};
                ob = {_id:flight._id,
                    flight_name : flight.flight.flight_name,
                    flight_operator_name : flight.flight.flight_operator_name,
                    departure_date : flight.flight.departure_date,
                    arrival_date : flight.flight.arrival_date,
                    origin : flight.flight.origin,
                    destination : flight.flight.destination,
                    business_class_price : flight.flight.classes[0].class_price,
                    economy_class_price : flight.flight.classes[1].class_price,
                    first_class_price : flight.flight.classes[2].class_price
                };
                flightFrontEnd.push(ob);
            });

            console.log("Temp"+JSON.stringify(flightFrontEnd));
            message = " Flight Listing\n" + flightDocuments;
            //console.log(message);
            res.code = "201";
            res.data = flightFrontEnd;
            callback(null, res);
        }
    });
}
exports.handle_request = handle_request;