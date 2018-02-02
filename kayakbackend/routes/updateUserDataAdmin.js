var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var topic_name = "update_user_data_admin_topic";

router.post('/', (req,res,next)=>{

    var message="";
    var userObject = {
        email : req.body.email,
        first_name : req.body.first_name,
        middle_name : req.body.middle_name,
        last_name : req.body.last_name,
        street : req.body.street,
        city : req.body.city,
        state : req.body.state,
        zip_code : req.body.zip_code,
        country : req.body.country,
        phone : req.body.phone,
    };

    kafka.make_request(topic_name, userObject, function(err,results){
        console.log('in result');
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                message="User Updated Successfully (Admin)";
                console.log(message);
                console.log("ID--"+results.data._id);
                return res.status(201).send({"message":message});
            }
            else {
                message="User updation Failed (Admin)";
                console.log(message);
                res.status(202).send({"message":message});
            }

        }
    });
});

module.exports = router;