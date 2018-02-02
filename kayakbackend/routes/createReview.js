var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var topic_name = "create_review_topic";

router.post('/', (req,res,next)=>{
    console.log("id is:" +req.body.data);
    console.log("id is:" +JSON.stringify(req.body.data));
    var message="";
    kafka.make_request(topic_name, req.body.data, function(err,results){
        console.log('in result'+results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                message="Review Added Successfully";
                console.log(message);
                console.log("ID--"+results.data._id);
                return res.status(201).send({"message":message});
            }
            else {
                message="Review creation Failed";
                console.log(message);
                res.status(202).send({"message":message});
            }
        }
    });
});
module.exports = router;