var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var CryptoJS = require("crypto-js");
//mongoose.connect('localhost:27017/kayak');
mongoose.connect('54.183.101.173:27017/kayak');
var carListings = require('../models/Listings');


function handle_request(msg, callback) {

    var res = {};
    var message = "";
    console.log("In handle request:"+ JSON.stringify(msg));

    if(msg.car_name == ""){
        var cond={"listing_type" : "Car"};
    }
    else{
        var cond = {$and : [ { "car.car_name": {'$regex':"^"+msg.car_name+"+",$options:'m',$options:'i'}}, {"listing_type" : "Car"}]};
    }
    

    carListings.find(cond, {car : 1} , function(err, carDocuments) {
        if (err) {
            console.log("Some Error Happened while getting Car Data");
            res.code = "500";
            res.data = err;
            callback(null, res);
        }
        else {

            var carFrontEnd = [];
            carDocuments.map(car=>{
                var ob = {};
                ob = {_id:car._id,
                    car_name : car.car.car_name,
                    car_type : car.car.car_type,
                    model_name : car.car.model_name,
                    car_rental_price : car.car.car_rental_price
                };
                carFrontEnd.push(ob);
            });

            console.log("Temp"+JSON.stringify(carFrontEnd));
            message = " Car Listing\n" + carDocuments;
            //console.log(message);
            res.code = "201";
            res.data = carFrontEnd;
            callback(null, res);
        }
    });

}
exports.handle_request = handle_request;