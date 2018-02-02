var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
var mongoose = require('mongoose');
mongoose.connect('54.183.101.173:27017/kayak');
var Users = require('../models/Users');


function handle_request(msg, callback){

    var res = {};
    var message = "";
    var email = msg.email;

    console.log("In handle request:"+ JSON.stringify(msg));

    Users.count({email:email}, function (err, count) {
        if(err)
        {
            message ="Some Error Happened while checking user ID";
            console.log(message);
            res.code="500";
            res.data=message;
            callback(null,res);
        }
        else {

            if (count > 0) {
                //document exists
                console.log("Get card details");
                Users.findOne({email: email}, function (err, result) {
                    if (err) {
                        console.log("Some Error Happened while fetching card details");
                        res=({"Message": err, status: "false", code: "500"});
                        callback(null, res);
                    }
                    else {
                        console.log(result);


                        var cardObj = {
                            email : result.email,
                            carddetails : {
                                credit_card_number: result.carddetails.credit_card_number,
                                card_name: result.carddetails.card_name,
                                expiry_month: result.carddetails.expiry_month,
                                expiry_year: result.carddetails.expiry_year,
                                street: result.carddetails.street,
                                city: result.carddetails.city,
                                state: result.carddetails.state,
                                zip_code: result.carddetails.zip_code,
                                country: result.carddetails.country
                            }
                        };
                        res=({cardObj: cardObj, status: "true", code: "201"});
                        callback(null, res);
                    }
                });
            }

        }
    });
}



exports.handle_request = handle_request;

