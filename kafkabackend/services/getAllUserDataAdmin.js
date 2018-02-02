var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
//mongoose.connect('localhost:27017/kayak');
mongoose.connect('54.183.101.173:27017/kayak');
var Users = require('../models/Users');


function handle_request(msg, callback) {

    var res = {};
    var message = "";
    console.log("In handle request:"+ JSON.stringify(msg));

    Users.find({} , {} , function(err, userDocuments) {
        if (err) {
            console.log("Some Error Happened while getting User Data");
            res.code = "500";
            res.data = err;
            callback(null, res);
        }
        else {

            var userFrontEnd = [];
            userDocuments.map(user=>{
                var ob = {};
                ob = {
                    _id:user._id,
                    email : user.email,
                    first_name : user.first_name,
                    middle_name : user.middle_name,
                    last_name : user.last_name,
                    street: user.address.street,
                    state : user.address.state,
                    zip_code : user.address.zip_code,
                    city : user.address.city,
                    phone : user.phone
                };
                userFrontEnd.push(ob);
            });

            console.log("Temp"+JSON.stringify(userFrontEnd));
            message = " User Listing\n" + userDocuments;
            //console.log(message);
            res.code = "201";
            res.data = userFrontEnd;
            callback(null, res);
        }
    }).limit(100);
}
exports.handle_request = handle_request;