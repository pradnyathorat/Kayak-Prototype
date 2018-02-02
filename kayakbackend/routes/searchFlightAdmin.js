var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var topic_name = "search_flight_admin_topic";

router.post('/', (req,res,next)=>{
    var message="";
    var flightObject = {
        flight_name : req.body.flight_name
    };

    kafka.make_request(topic_name, flightObject, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                message="Search Flights executed Successfully";
                console.log(message);
                console.log("Result"+results);
                return res.status(201).send({"message":results});
            }
            else {
                message="Failed to search Flights";
                console.log(message);
                res.status(202).send({"message":err});
            }
        }
    });
});

module.exports = router;