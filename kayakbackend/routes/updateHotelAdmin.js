var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var topic_name = "update_hotel_admin_topic";

var redis = require('redis');
var redisClient = redis.createClient({host : 'localhost', port : 6379});

router.post('/', (req,res,next)=>{
    var message="";
    var hotelObject = {
        _id : req.body._id,
        hotel_name : req.body.hotel_name,
        stars : req.body.stars,
        street : req.body.street,
        room_price_value1 : req.body.room_price_value1,
        room_price_value2 : req.body.room_price_value2,
        room_price_value3 : req.body.room_price_value3,
        room_type_value1 : req.body.room_type_value1,
        room_type_value2 : req.body.room_type_value2,
        room_type_value3 : req.body.room_type_value3,
        state : req.body.state,
        zip_code : req.body.zip_code,
        city : req.body.city
    };

    kafka.make_request(topic_name, hotelObject, function(err,results){
        console.log('in result');
        console.log(hotelObject);
        console.log(" I got this:"+JSON.stringify(results));
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                
                message="Hotel Updated Successfully";
                console.log(message);
                console.log("ID--"+results.data._id);
                return res.status(201).send({"message":message});
            }
            else {
                message="Hotel updation Failed";
                console.log(message);
                res.status(202).send({"message":message});
            }

        }
    });
});

module.exports = router;