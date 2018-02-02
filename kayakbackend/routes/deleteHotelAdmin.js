var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var topic_name = "delete_hotel_admin_topic";

router.post('/', (req,res,next)=>{
    var message="";
    console.log("id is: "+req.body._id);
    var hotelObject = {
        _id : req.body._id,
    };

    kafka.make_request(topic_name, hotelObject, function(err,results){
        console.log('in result');
        console.log(hotelObject);
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                message="Hotel Deleted Successfully";
                console.log(message);

                return res.status(201).send({"message":message});
            }
            else {
                message="Hotel Deletion Failed";
                console.log(message);
                res.status(202).send({"message":message});
            }

        }
    });
});

module.exports = router;