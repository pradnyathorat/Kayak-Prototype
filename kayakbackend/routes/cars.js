var express = require('express');
var autoIncrement = require("mongodb-autoincrement");
var router = express.Router();
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/kayak";
var kafka = require('./kafka/client');
var fs = require('fs');
var path = require('path');
var dateTime = require('node-datetime');
var dt = dateTime.create();

var topic_name = "cars_topic";

router.post('/', (req, res, next)=>{
    var city = req.body.city;
    var pickuptime = req.body.pickuptime;
    var dropofftime = req.body.dropofftime;
    var order = req.body.order;
    var filter_prop = req.body.filter_prop;
    var key = "search";


    var logger = fs.createWriteStream(path.join(__dirname, '../') + 'car_log.csv', {
    flags: 'a'
    })
    logger.write(`\r\n${req.body.city}` + ','+new Date(dt.now())+','+'1');

kafka.make_request(topic_name, {key, city, pickuptime, dropofftime, order, filter_prop}, function(err, results){
    if(err){
        done(err,{});
    }
    else
    {
        if(results.code == 201){
            console.log("Cars found")
            return res.status(201).send(results);
        }
        else if(results.code == 202){
            console.log("No cars found")
            return res.status(202).send(results);
        }
    }
})
})

router.post('/book', (req, res, next)=>{
    // var flightId = req.body.flightId;
    var userId = req.body.userId;
    // var amount = req.body.amount;
    // var departure_date = req.body.departure_date;
    // var arrival_date = req.body.arrival_date;
    // var no_of_traveler = req.body.no_of_traveler;
    var key = "book";

    var email = req.body.email;
    var bill_amount = req.body.bill_amount;
    var car = req.body.car;

    kafka.make_request(topic_name, {key,email,bill_amount,car}, function(err, results){
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Cars booked")
                return res.status(201).send(results);
            }
            else if(results.code == 202){
                console.log("Booking error")
                return res.status(202).send(results);
            }
        }
    })
})

module.exports = router;