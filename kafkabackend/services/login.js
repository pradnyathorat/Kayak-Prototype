var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");

//var mongoURL = "mongodb://localhost:27017/kayak";
//var mongoURL = "mongodb://54.67.27.46:27017/kayak";
mongoose.connect('54.183.101.173:27017/kayak');

var Users = require('../models/Users');


function handle_request(msg, callback) {

    var res = {};
    var message = "";
    console.log("In handle request:"+ JSON.stringify(msg));

    var email = msg.email;
    var password = msg.password;
    var bytes  = CryptoJS.AES.decrypt(password.toString(), "kayak");
    password = bytes.toString(CryptoJS.enc.Utf8);

    Users.findOne({"email":email}, function(err,loginData) {
        if(err)
        {
            message = "Some Error Happen";
            console.log(message);
            res.code = "401";
            res.data = message;
            callback(null, res);
        }
        else
        {
            if(loginData) {
                bcrypt.compare(password, loginData.password).then(function(result) {
                    if(result){

                        message = "User validated: "+loginData.email;
                        console.log(message);
                        res.code="201";
                        res.data={
                            loginData
                        };
                        callback(null, res);
                    }
                    else {
                        message = "User validation failed";
                        console.log(message);
                        res.code="401";
                        res.data=message;
                        callback(null, res);
                    }
                });
            }
        }
    });
}
exports.handle_request = handle_request;