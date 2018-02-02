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

//redis
var redis = require('redis');
var redisClient = redis.createClient({host : 'localhost', port : 6379});


var topic_name = "hotels_topic";

router.post('/', (req, res, next)=>{

    var city = req.body.city;
    var checkin = req.body.checkIn;
    var checkout = req.body.checkOut;
    //guest object contains #adults #children
    var guest = req.body.guest;
    var noOfGuest = req.body.noOfGuest;
    var noOfRoom = req.body.noOfRoom;
    var order = req.body.order;
    var filter_prop = req.body.filter_prop;
    var key = "search";

    var logger = fs.createWriteStream(path.join(__dirname, '../') + 'hotel_log.csv', {
        flags: 'a'
    })
    logger.write(`\r\n${req.body.city}` + ','+new Date(dt.now())+','+'1');

    // redisClient.get(city,function(err,reply) {
    //     console.log(err);
    //     console.log(JSON.parse(reply));
    //     if(reply !== null){
    //             console.log("Hotels found in Redis:")
    //             console.log()
    //             return res.status(201).send(JSON.parse(reply));
    //     }
    //     else
    //     {

//             if(results.code == 201){
//                 console.log("Hotels found:")
// /*                fs.writeFile(path.join(__dirname, '../../') + 'hotel_log.csv', ' ' +`/${req.body.city} ` +  new Date(dt.now()), function (err) {
//                     if (err) throw err;
//                 });*/

//                 var logger = fs.createWriteStream(path.join(__dirname, '../') + 'hotel_log.csv', {
//                     flags: 'a'
//                 })
//                 logger.write(`\r\n${req.body.city}` + ','+new Date(dt.now())+','+'1');
//                 return res.status(201).send(results);
//             }
//             else if(results.code == 202){
//                 console.log("No hotels found")
//                 return res.status(202).send(results);
//             }

            kafka.make_request(topic_name, {key, city, checkin, checkout, guest, noOfGuest, noOfRoom, order, filter_prop}, function(err, results){

                console.log(filter_prop);
                if(err){
                    done(err,{});
                }
                else
                {
                    if(results.code == 201){
                        console.log("Hotels found:")
                        redisClient.set(city, JSON.stringify(results), function(err, reply){
                            console.log(err);
                            console.log(reply);
                        })
                        return res.status(201).send(results);
                    }
                    else if(results.code == 202){
                        console.log("No hotels found")
                        return res.status(202).send(results);
                    }
                }
            })
    //     }
    // });

})

// router.post('/', (req,res,next)=>{
//     var email=req.body.email;
//     var password=req.body.password;
//
//
//     kafka.make_request(topic_name, {email, password}, function(err,results){
//         console.log('in result');
//         console.log(results);
//         if(err){
//             done(err,{});
//         }
//         else
//         {
//             if(results.code == 201){
//                 console.log("Signup Successful");
//                 return res.status(201).send({"message":"Signup Successful"});
//             }
//             else {
//                 res.status(202).send({"message":"User exists"});
//                 console.log("Signup Failed");
//             }
//         }
//     });
// });

router.post('/book', (req, res, next)=>{
    
    var key = "book";

    var email = req.body.email;
    var bill_amount = req.body.bill_amount;
    var hotel = req.body.hotel;

    kafka.make_request(topic_name, {key, email, bill_amount, hotel}, function(err, results){
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Hotel booked")
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