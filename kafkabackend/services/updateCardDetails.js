var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
var mongoose = require('mongoose');
mongoose.connect('54.183.101.173:27017/kayak');
var Users = require('../models/Users');

function handle_request(msg, callback){

    var res = {};
    var message = "";
    var email = msg.email;
    var cardDetailsObject = {
        email:msg.email,
        carddetails : {
            credit_card_number: msg.credit_card_number,
            card_name: msg.card_name,
            expiry_month: msg.expiry_month,
            expiry_year: msg.expiry_year,
            street: msg.street,
            city: msg.city,
            state: msg.state,
            zip_code: msg.zip_code,
            country: msg.country
        }
    };


    console.log("In handle request:"+ JSON.stringify(cardDetailsObject));

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
            message = "Update Card";
            console.log(message);

            //var user = new Users(userObject);
            var condition = {
                email: email
            };

            var updateCol = {$set: cardDetailsObject};
            Users.update(condition, updateCol, {upsert: true}, function (err) {

                if (err) {
                    console.log("errrr");
                    console.log("Some Error Happened while Updating user");
                    res.code = "500";
                    res.data = message;
                    callback(null, res);
                }
                else {
                    message = "User rows updated";
                    console.log(message);
                    res.code = "201";
                    res.data = "Update Card Successful";
                    callback(null, res);
                }
            });

        }
    });
}
exports.handle_request = handle_request;