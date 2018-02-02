var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var topic_name = "update_car_admin_topic";

router.post('/', (req,res,next)=>{
    var message="";
    var carObject = {
        _id : req.body._id,
        car_name : req.body.car_name,
        car_type : req.body.car_type,
        model_name : req.body.model_name,
        car_rental_price : req.body.car_rental_price,
        city: req.body.city,
        no_of_passengers:req.body.no_of_passengers,
        luggage_capacity:req.body.luggage_capacity,
        ac:req.body.ac
    };

    kafka.make_request(topic_name, carObject, function(err,results){
        console.log('in result');
        console.log(carObject);
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                message="Car Updated Successfully";
                console.log(message);
                console.log("ID--"+results.data._id);
                return res.status(201).send({"message":message});
            }
            else {
                message="Car updation Failed";
                console.log(message);
                res.status(202).send({"message":message});
            }

        }
    });
});

module.exports = router;