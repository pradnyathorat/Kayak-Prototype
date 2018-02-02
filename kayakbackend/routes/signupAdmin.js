var express = require('express');
var autoIncrement = require("mongodb-autoincrement");
var router = express.Router();
var mongo = require("./mongo");
var mongoURL = "mongodb://54.183.101.173:27017/kayak";

var kafka = require('./kafka/client');

var topic_name = "signup_admin_topic";

router.post('/', (req,res,next)=>{

    var adminObj = {

        email : req.body.email,
        password : req.body.password,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        street : req.body.street,
        city : req.body.city,
        state : req.body.state,
        zip_code : req.body.zip_code,
        country : req.body.country,
        phone : req.body.phone,
        email : req.body.email,
        password : req.body.password
    };

    kafka.make_request(topic_name, adminObj, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results.code == 201){
                console.log("Signup Successful");
                return res.status(201).send({"message":results});
            }
            else {
                res.status(202).send({"message":err});
                console.log("Signup Failed");
            }
        }
    });
});


// // Without Connection Pooling
// try {
//     mongo.connect(mongoURL, function(db){
//     console.log('Connected to mongo at: ' + mongoURL);
//     const loginCollectionName = 'login'; 
//     const loginCollection = db.collection(loginCollectionName);
//     const personalCollectionName = 'user'; 
//     const personalCollection = db.collection(personalCollectionName);

//     loginCollection.findOne({"username":username}, function(err, user){
//         if (user) {
//             console.log("User is: "+user);
//             return res.status(202).send({"message":"User exists"});
//         } 
//         else {
//             autoIncrement.getNextSequence(db, loginCollectionName, function (err, autoIndex) {

//                 loginCollection.insert({
//                     userid: autoIndex+'',
//                     username:username,
//                     password:password,
//                 });
//                 personalCollection.insert({
//                     userid: autoIndex+'',
//                     firstname,
//                     lastname,
//                 });
//                 var dir = './UserFiles/'+autoIndex; 
//                 var homedir = './UserFiles/'+autoIndex+'/home'; 
//                 mkdirp('./UserFiles/', function(err){
//                     mkdirp(dir, function (err) {
//                         if (err) console.error(err)
//                         else{
//                             mkdirp(homedir,(err) =>{
//                                 console.log("created!");
//                             });
//                         }
//                     });
//                 });
//             });
//             return res.status(201).send({"message":"Signup Successful"});
//         }
//     });
// });

// }
// catch (e){
//         console.log("error in insertion");
//     }



// try {
//         mongo.getConnection((connectionNumber,db)=>{
//         const loginCollectionName = 'login';
//         const loginCollection = db.collection(loginCollectionName);
//         const personalCollectionName = 'user';
//         const personalCollection = db.collection(personalCollectionName);

//         loginCollection.findOne({"username":username}, function(err, user){
//             if (user) {
//                 console.log("User is: "+user);
//                 return res.status(202).send({"message":"User exists"});
//             }
//             else {
//                 autoIncrement.getNextSequence(db, loginCollectionName, function (err, autoIndex) {
//                     loginCollection.insert({
//                         _id: autoIndex,
//                         username:username,
//                         password:password,
//                     });
//                     personalCollection.insert({
//                         _id: autoIndex,
//                         firstname,
//                         lastname,
//                     });

//                 });
//                 return res.status(201).send({"message":"Signup Successful"});
//             }
//         });
//     });
//
// }
// catch (e){
//     console.log("error in insertion");
// }

module.exports = router;