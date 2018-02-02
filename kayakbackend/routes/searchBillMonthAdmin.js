var express = require('express');
var router = express.Router();
var kafka = require('./kafka/client');
var topic_name = "search_bill_month_admin_topic";



router.post('/', (req,res,next)=>{
    var message="";
    var billObject = {
        month : req.body.month,
        year : req.body.year
    };
    console.log("BillObject"+billObject);
    console.log("BillObject"+JSON.stringify(billObject));
    kafka.make_request(topic_name, billObject, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                message="Search bill Month executed Successfully";
                console.log(message);
                console.log("Result"+JSON.stringify(results.data));
                return res.status(201).send({"message":results});
            }
            else {
                message="Failed to search bill by Month";
                console.log(message);
                res.status(202).send({"message":err});
            }
        }
    });
});

module.exports = router;