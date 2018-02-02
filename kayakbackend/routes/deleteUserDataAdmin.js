var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var topic_name = "delete_user_data_admin_topic";

router.post('/', (req,res,next)=>{
    var message="";
    var userDataObject = {
        email : req.body.email,
    };

    kafka.make_request(topic_name, userDataObject, function(err,results){
        console.log('in result');
        console.log(userDataObject);
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                message="User Deleted Successfully";
                console.log(message);
                //console.log("ID--"+results.data._id);
                return res.status(201).send({"message":message});
            }
            else {
                message="User Deletion Failed";
                console.log(message);
                res.status(202).send({"message":message});
            }

        }
    });
});

module.exports = router;