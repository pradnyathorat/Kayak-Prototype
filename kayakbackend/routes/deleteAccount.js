var express = require('express');
var router = express.Router();
var mongo = require("./mongo");

var kafka = require('./kafka/client');

var topic_name = "delete_user_topic";

router.post('/', function (req, res, next) {

    var userId= (req.body.userId);

    kafka.make_request(topic_name,{userId}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("User deleted successfully");
                return res.status(201).send({"message":"User deleted"});
            }
            else {
                res.status(202).send({"message":"User deletion failed"});
                console.log("User deletion Failed");
            }
        }
    });
});

module.exports = router;



