var mongoose = require('mongoose');
mongoose.connect('54.183.101.173:27017/kayak');
var Listings = require('../models/Listings');

var Bill = require('../models/Bill');


function handle_request(msg, callback) {
    var res = {};
    var message = "";
    var departure_date = msg.departure_date;
    var arrival_date = msg.arrival_date;
    var origin = msg.origin;
    var destination = msg.destination;
    var traveler_info= msg.traveler_info;
    var flight_class = msg.flight_class;
    var filter_prop = msg.filter_prop;
    var no_of_traveler = msg.no_of_traveler;

    console.log("In handle request:"+ JSON.stringify(msg));

    if(msg.order == "price_desc"){
        Listings.find(
            {
                "flight.departure_date":{$gte:departure_date+"T00:00:00.000Z", $lte:departure_date+"T23:59:59.000Z"},
                //"flight.arrival_date":{$gte:arrival_date+"T00:00:00.000Z", $lte:arrival_date+"T23:59:59.000Z"},
                "flight.origin":{'$regex':'^'+origin+'+',$options:'i'},
                "flight.destination":{'$regex':'^'+destination+'+',$options:'i'},
                "flight.classes.class_type":flight_class,
                "flight.stops":{$nin:filter_prop.stops},
                "flight.flight_operator_name":{$nin:filter_prop.flight_name},

            }, function(err, flights){
                if(err){
                    message=err
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
            }).sort({'flight.classes.class_price': 1})
    }
    else if(msg.order == "price_asc"){
        Listings.find(
            {
                "flight.origin":{'$regex':'^'+origin+'+',$options:'i'},
                //"flight.destination":{'$regex':'^'+destination+'+',$options:'i'},
                "flight.departure_date":{$gte:departure_date+"T00:00:00.000Z", $lte:departure_date+"T23:59:59.000Z"},
                "flight.arrival_date":{$gte:arrival_date+"T00:00:00.000Z", $lte:arrival_date+"T23:59:59.000Z"},
                "flight.classes.class_type":flight_class,
                "flight.stops":{$nin:filter_prop.stops},
                "flight.flight_operator_name":{$nin:filter_prop.flight_name},

            }, function(err, flights){
                if(err){
                    message=err
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
            }).sort({'flight.classes.class_price': -1})
    }
    else if(msg.order == "departure_desc"){
        Listings.find(
            {
                "flight.origin":{'$regex':'^'+origin+'+',$options:'i'},
                "flight.destination":{'$regex':'^'+destination+'+',$options:'i'},
                "flight.departure_date":{$gte:departure_date+"T00:00:00.000Z", $lte:departure_date+"T23:59:59.000Z"},
                //"flight.arrival_date":{$gte:arrival_date+"T00:00:00.000Z", $lte:arrival_date+"T23:59:59.000Z"},
                "flight.classes.class_type":flight_class,
                "flight.stops":{$nin:filter_prop.stops},
                "flight.flight_operator_name":{$nin:filter_prop.flight_name},

            }, function(err, flights){
                if(err){
                    message=err
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
            }).sort({'flight.departure_date': 1})
    }
    else if(msg.order == "departure_asc"){
        Listings.find(
            {
                "flight.origin":{'$regex':'^'+origin+'+',$options:'i'},
                "flight.destination":{'$regex':'^'+destination+'+',$options:'i'},
                "flight.departure_date":{$gte:departure_date+"T00:00:00.000Z", $lte:departure_date+"T23:59:59.000Z"},
                //"flight.arrival_date":{$gte:arrival_date+"T00:00:00.000Z", $lte:arrival_date+"T23:59:59.000Z"},
                "flight.classes.class_type":flight_class,
                "flight.stops":{$nin:filter_prop.stops},
                "flight.flight_operator_name":{$nin:filter_prop.flight_name},

            }, function(err, flights){
                if(err){
                    message=err
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
            }).sort({'flight.departure_date': -1})
    }
    else if(msg.order == "arrival_desc"){
        Listings.find(
            {
                "flight.origin":{'$regex':'^'+origin+'+',$options:'i'},
                "flight.destination":{'$regex':'^'+destination+'+',$options:'i'},
                "flight.departure_date":{$gte:departure_date+"T00:00:00.000Z", $lte:departure_date+"T23:59:59.000Z"},
                //"flight.arrival_date":{$gte:arrival_date+"T00:00:00.000Z", $lte:arrival_date+"T23:59:59.000Z"},
                "flight.classes.class_type":flight_class,
                "flight.stops":{$nin:filter_prop.stops},
                "flight.flight_operator_name":{$nin:filter_prop.flight_name},

            }, function(err, flights){
                if(err){
                    message=err
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
            }).sort({'flight.arrival_date': 1})
    }
    else if(msg.order == "arrival_asc"){
        Listings.find(
            {
                "flight.origin":{'$regex':'^'+origin+'+',$options:'i'},
                "flight.destination":{'$regex':'^'+destination+'+',$options:'i'},
                "flight.departure_date":{$gte:departure_date+"T00:00:00.000Z", $lte:departure_date+"T23:59:59.000Z"},
                //"flight.arrival_date":{$gte:arrival_date+"T00:00:00.000Z", $lte:arrival_date+"T23:59:59.000Z"},
                "flight.classes.class_type":flight_class,
                "flight.stops":{$nin:filter_prop.stops},
                "flight.flight_operator_name":{$nin:filter_prop.flight_name},

            }, function(err, flights){
                if(err){
                    message=err
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
            }).sort({'flight.arrival_date': -1})
    }

}

function handle_booking(msg, callback){
    var res = {};
    var message = "";

    var email = msg.email;
    var bill_amount = msg.bill_amount;
    var flight = msg.flight;

    console.log("In handle request:"+ JSON.stringify(msg));

    var billObject = {
        email:email,
        bill_date:new Date(),
        bill_type:"Flight",
        bill_amount:bill_amount,
        flight:flight,
    }

    var bill = new Bill(billObject);
    bill.save(function (err, product, numAffected) {
        if (err) {
            console.log("Some Error Happened while Inserting billing details");
            res.code = "500";
            res.data = "Error Happened";
            callback(null, res);
        }
        else {
            message = numAffected + " rows added into Billing\n" + product;
            console.log(message);
            res.code = "201";
            res.data = "Bill adding Successful";
            callback(null, res);
        }
    });
}

exports.handle_booking = handle_booking;
exports.handle_request = handle_request;