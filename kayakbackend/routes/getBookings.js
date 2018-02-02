var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');

var topic_name = "get_bookings_topic";

router.post('/', (req, res, next)=>{
    var email = req.body.email;

    kafka.make_request(topic_name, {email}, function(err, results){
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Bookings found")
                return res.status(201).send(results);
            }
            else if(results.code == 202){
                console.log("No Bookings found")
                return res.status(202).send(results);
            }
        }
    })
});

module.exports = router;