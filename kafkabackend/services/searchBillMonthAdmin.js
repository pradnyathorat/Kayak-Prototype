var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
//mongoose.connect('localhost:27017/kayak');
var options = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 40, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};

mongoose.connect('mongodb://54.183.101.173:27017/kayak', options);

//mongoose.connect('mongodb://54.183.101.173:27017/kayak');

var Bill = require('../models/Bill');


function handle_request(msg, callback) {

    var res = {};
    var message = "";
    var nextMonth;
    var nextYear;
    var month;

    if(parseInt(msg.month) == 12){
        nextMonth = 1;
        nextYear = parseInt(msg.year)+1;
        nextMonth = "0"+nextMonth;
    }
    else{
        nextMonth = parseInt(msg.month)+1;
        if(nextMonth<10){
            nextMonth = "0"+nextMonth;
        }
        nextYear = parseInt(msg.year);
    }
    
    if(parseInt(msg.month) < 10){
        
        month = "0"+msg.month;
    }
    else{
        month=msg.month;
    }

    console.log(nextYear+"-"+nextMonth+"-"+"01T00:00:00.000Z");
    console.log("In handle request:"+ JSON.stringify(msg));

    var cond={};
    if(msg.email == ""){
        cond={};
    }
    else{
        cond = {
            bill_date: {
                $gte:new Date(msg.year+"-"+month+"-"+"01T00:00:00.000Z"),
                $lte:new Date(""+nextYear+"-"+nextMonth+"-"+"01T00:00:00.000Z")
            }
        };
    }
    Bill.find(cond, {} , function(err, billDocuments) {
        if (err) {
            console.log("Some Error Happened while getting Bill Data");
            res.code = "500";
            res.data = err;
            callback(null, res);
        }
        else {

            message = " Bill\n" + billDocuments;
            res.code = "201";
            res.data = billDocuments;
            callback(null, res);
        }
    });
}
exports.handle_request = handle_request;