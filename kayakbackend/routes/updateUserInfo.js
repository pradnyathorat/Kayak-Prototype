var express = require('express');
var autoIncrement = require("mongodb-autoincrement");
var router = express.Router();
var mongo = require("./mongo");
//var mongoURL = "mongodb://localhost:27017/kayak";
var mongoURL = "mongodb://54.183.101.173:27017/kayak";

var kafka = require('./kafka/client');

var topic_name = "updateUserInfo_topic";

router.post('/', (req,res,next)=>{



    var userInfoObject = {
        email : req.body.email,
        first_name : req.body.first_name,
        middle_name : req.body.middle_name,
        last_name : req.body.last_name,
        street : req.body.street,
        city : req.body.city,
        state : req.body.state,
        postalcode : req.body.postalcode,
        country : req.body.country,
        phone : req.body.phone,
    };


kafka.make_request(topic_name, userInfoObject, function(err,results){
    console.log('in update make request: ',req.body.email);
    console.log(results);
    if(err){
        done(err,{});
    }
    else
    {
        if(results.code == 201){
            console.log("Update Successful");
            return res.status(201).send({"message":"Update Successful"});
        }
        else {
            res.status(202).send({"message":"User exists"});
            console.log("Update Failed");
        }
    }
});
});


module.exports = router;