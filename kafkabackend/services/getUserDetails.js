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
                console.log("Get user details");
                Users.findOne({email: email}, function (err, result) {
                    if (err) {
                        console.log("Some Error Happened while fetching user details");
                        res=({"Message": err, status: "false", code: "500"});
                        callback(null, res);
                    }
                    else {
                        console.log(result);


                        var userObj = {
                            email : result.email,
                            first_name : result.first_name,
                            middle_name : result.middle_name,
                            last_name : result.last_name,

                            address : {
                                street: result.address.street,
                                state : result.address.state,
                                zip_code : result.address.zip_code,
                                city : result.address.city,
                                country: "US"
                            },
                            phone : result.phone,
                        };
                        res=({userObj: userObj, status: "true", code: "201"});
                        callback(null, res);
                    }
                });
            }

        }
    });
}



exports.handle_request = handle_request;

