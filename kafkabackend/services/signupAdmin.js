var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
var mongoose = require('mongoose');
mongoose.connect('54.183.101.173:27017/kayak');
var Admin = require('../models/Admin');

const saltRounds = 10;

function handle_request(msg, callback){

    var res = {};
    var message = "";

    var password = msg.password;

    var bytes  = CryptoJS.AES.decrypt(password.toString(), "kayak");
    password = bytes.toString(CryptoJS.enc.Utf8);

    console.log("In handle request:"+ JSON.stringify(msg));

    Admin.count({email:msg.email}, function (err, count) {
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
                //User exists
                message="Admin :"+email+" Exists";
                console.log(message);
                res.code="202";
                res.data=message;
                callback(null,res);
            }
            else {
                message="Insert Admin";
                console.log(message);

                bcrypt.hash(password, saltRounds, function(err, hash) {
                    if(!err) {
                        var userObject = {
                            first_name : msg.first_name,
                            last_name :msg.last_name,
                            address : {
                                street: msg.street,
                                city : msg.city,
                                state: msg.state,
                                zip_code: msg.zip_code,
                                country : msg.country
                            },
                            phone : msg.phone,
                            email: msg.email,
                            password: hash
                        };
                        var admin = new Admin(userObject);
                        admin.save(function (err, product, numAffected) {
                            if (err) {
                                console.log("Some Error Happened while Inserting Admin");
                                res.code = "500";
                                res.data = message;
                                callback(null, res);
                            }
                            else {
                                message = numAffected + " rows added into Admin\n" + product;
                                console.log(message);
                                res.code = "201";
                                res.data = "Signup Successful";
                                callback(null, res);
                            }
                        });
                    }
                    else
                    {
                        message = "Some Error Happened while Hashing";
                        console.log(message);
                        res.code = "500";
                        res.data = message;
                        callback(null, res);
                    }
                });
            }
        }
    });
    //
    // // Without Connection Pooling
    // try {
    //     mongo.connect(mongoURL, function(db){
    //         console.log('Connected to mongo at: ' + mongoURL);
    //         const loginCollectionName = 'login';
    //         const loginCollection = db.collection(loginCollectionName);
    //
    //         const email=msg.email;
    //         var password=msg.password;
    //
    //         var bytes  = CryptoJS.AES.decrypt(password.toString(), "kayak");
    //         password = bytes.toString(CryptoJS.enc.Utf8);
    //
    //         loginCollection.findOne({"email":email}, function(err, user){
    //             if (user) {
    //                 console.log("User is: "+user);
    //
    //                 res.code="202";
    //                 res.data="User Exists";
    //                 callback(null,res);
    //             }
    //             else {
    //                 bcrypt.hash(password, saltRounds, function(err, hash) {
    //                     autoIncrement.getNextSequence(db, loginCollectionName, function (err, autoIndex) {
    //                         loginCollection.insert({
    //                             userid: autoIndex.toString(),
    //                             email:email,
    //                             password:hash,
    //                         });
    //                     });
    //                 });
    //
    //                 res.code="201";
    //                 res.data="Signup Successful";
    //                 callback(null,res);
    //             }
    //         });
    //     });
    // }
    // catch (e){
    //     console.log("error in insertion");
    // }
}
exports.handle_request = handle_request;