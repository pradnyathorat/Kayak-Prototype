var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
var mongoose = require('mongoose');
mongoose.connect('54.183.101.173:27017/kayak');
var Users = require('../models/Users');

function handle_request(msg, callback){

    var res = {};
    var message = "";
    var email = msg.email;
    var userInfoObject = {
        email : msg.email,
        first_name : msg.first_name,
        middle_name : msg.middle_name,
        last_name : msg.last_name,
        address : {
            street: msg.street,
            state : msg.state,
            zip_code : msg.postalcode,
            city : msg.city,
            country: "US"
        },
        phone : msg.phone,
    };



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
            message = "Update User";
            console.log(message);

            //var user = new Users(userObject);
            var condition = {
                email: email
            };

            var updateCol = {$set: userInfoObject};
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
                    res.data = "Update Successful";
                    callback(null, res);
                }
            });

        }
    });
}
exports.handle_request = handle_request;