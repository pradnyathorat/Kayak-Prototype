var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var topic_name = "search_car_admin_topic";

router.post('/', (req,res,next)=>{

    var message="";
    var carObject = {
        car_name : req.body.car_name
    };

    kafka.make_request(topic_name, carObject, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                message="Search Cars executed Successfully";
                console.log(message);
                console.log("Result"+results);
                return res.status(201).send({"message":results});
            }
            else {
                message="Failed to get Car";
                console.log(message);
                res.status(202).send({"message":err});
            }
        }
    });
});

module.exports = router;