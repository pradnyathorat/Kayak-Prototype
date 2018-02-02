var mongoose = require('mongoose');
mongoose.connect('54.183.101.173:27017/kayak');
var Bill = require('../models/Bill');


function handle_request(msg, callback) {
    var res = {};
    var message = "";
    var email = msg.email;

    console.log("In handle request:"+ JSON.stringify(msg));

        Bill.find({
            "email":email
        }, function(err, bookings){
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else
            {
                console.log(new Date());
                //console.log(eachBooking.flight.flight_start_date);
                var len = bookings.length;
                var bk = [];
                j=0;
                console.log("booking :", bookings);
                bookings.forEach(eachBooking =>{
                    if(eachBooking.bill_type == "Flight"){
                        if(eachBooking.flight.flight_end_date < new Date()){
                            var eb = JSON.stringify(eachBooking);
                            var obj = {time : "past"};
                            var retriveObj = eb;
                            var newData = JSON.parse(retriveObj);
                            Object.assign(newData, obj);
                            bk.push(newData);
                        }
                        else
                        {
                            var eb = JSON.stringify(eachBooking);
                            var obj = {time : "future"};
                            var retriveObj = eb;
                            var newData = JSON.parse(retriveObj);
                            Object.assign(newData, obj);
                            bk.push(newData);
                        }
                    }
                    else if(eachBooking.bill_type == "Hotel"){
                        console.log(eachBooking.hotel.booking_end_date);
                        if(eachBooking.hotel.booking_end_date < new Date()){
                            var eb = JSON.stringify(eachBooking);
                            var obj = {time : "past"};
                            var retriveObj = eb;
                            var newData = JSON.parse(retriveObj);
                            Object.assign(newData, obj);
                            bk.push(newData);
                        }
                        else
                        {
                            var eb = JSON.stringify(eachBooking);
                            var obj = {time : "future"};
                            var retriveObj = eb;
                            var newData = JSON.parse(retriveObj);
                            Object.assign(newData, obj);
                            bk.push(newData);
                            console.log("uncool");
                        }
                    }
                    else if(eachBooking.bill_type == "Car"){
                        console.log("each",eachBooking.car.booking_start_date)
                        if(eachBooking.car.booking_start_date < new Date()){
                            var eb = JSON.stringify(eachBooking);
                            var obj = {time : "past"};
                            var retriveObj = eb;
                            var newData = JSON.parse(retriveObj);
                            Object.assign(newData, obj)
                            bk.push(newData);
                        }
                        else
                        {
                            var eb = JSON.stringify(eachBooking);
                            var obj = {time : "future"};
                            var retriveObj = eb;
                            var newData = JSON.parse(retriveObj);
                            Object.assign(newData, obj)
                            eb.time = "past";

                            bk.push(newData);
                        }
                    }
                    j++;
                    if(j == len){
                        message=bk;
                        res.code = "201"
                        res.data = message;
                        callback(null, res);
                    }
                })



            }

        })
}

exports.handle_request = handle_request;