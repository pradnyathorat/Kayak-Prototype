var express = require('express');
var autoIncrement = require("mongodb-autoincrement");
var router = express.Router();
var mongo = require("./mongo");
//var mongoURL = "mongodb://localhost:27017/kayak";
var mongoURL = "mongodb://54.183.101.173:27017/kayak";

var kafka = require('./kafka/client');

var topic_name = "getCardDetails_topic";

router.post('/', (req,res,next)=>{

    kafka.make_request(topic_name, {email : req.body.email}, function(err,results){
        console.log('in Get Card Details request: ',req.body.email);
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Get Card Details Successful");
                return res.status(201).send(results);
            }
            else {
                res.status(202).send({"message":"User exists"});
                console.log("getCardDetails Failed");
            }
        }
    });
});


module.exports = router;