var express = require('express');
var autoIncrement = require("mongodb-autoincrement");
var router = express.Router();
var mongo = require("./mongo");
//var mongoURL = "mongodb://localhost:27017/kayak";
var mongoURL = "mongodb://54.183.101.173:27017/kayak";

var kafka = require('./kafka/client');

var topic_name = "updateCardDetails_topic";

router.post('/', (req,res,next)=>{



    var cardDetailsObject = {
        email:req.body.email,
        credit_card_number : req.body.credit_card_number,
        card_name : req.body.card_name,
        expiry_month : req.body.expiry_month,
        expiry_year : req.body.expiry_year,
        street : req.body.street,
        city : req.body.city,
        state : req.body.state,
        zip_code : req.body.zip_code,
        country : req.body.country
    };

    console.log("Card Object for make request:"+JSON.stringify(cardDetailsObject));
    kafka.make_request(topic_name, cardDetailsObject, function(err,results){
        console.log('in update card make request: ',req.body.email);
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Update Card Successful");
                return res.status(201).send({"message":"Update Card Successful"});
            }
            else {
                res.status(202).send({"message":"User exists"});
                console.log("Update Card Failed");
            }
        }
    });
});


module.exports = router;