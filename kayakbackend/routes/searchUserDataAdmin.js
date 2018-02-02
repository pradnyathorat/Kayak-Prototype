var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var topic_name = "search_user_data_admin_topic";

router.post('/', (req,res,next)=>{
    var message="";
    var userObject = {
        email : req.body.email
    };

    kafka.make_request(topic_name, userObject, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                message="Search user executed Successfully";
                console.log(message);
                console.log("Result"+JSON.stringify(results.data));
                return res.status(201).send({"message":results});
            }
            else {
                message="Failed to search user";
                console.log(message);
                res.status(202).send({"message":err});
            }
        }
    });
});

module.exports = router;