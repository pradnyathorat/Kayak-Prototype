var mongoose = require('mongoose');



mongoose.connect('mongodb://54.183.101.173:27017/kayak');
var Bill = require('../models/Bill');

function handle_hotels(msg, callback){
    var res = {};
    var message = "";
    var nextMonth = "02";
    var nextYear = msg.year;
    var thisMonth = "01";
    var arr = [];
    console.log("In handle request:" + JSON.stringify(msg));
    Bill.aggregate(
        [
            {
               // bill_date :{$month:}
                $match:{"hotel.hotel_name":msg.hotelName, "bill_type":"Hotel"}
            },
            {
                $group:{_id:{month:{$month:"$bill_date"}}, total:{$sum:"$hotel.amount"}}
            }
        ], function(err, hotels){
            if(err){
                        message="error"
                        res.code = "202"
                        res.data = message;
                        callback(null, res)
                    }
                    else{
                        res.code = "201"
                        res.data = hotels;
                        console.log(hotels);
                        callback(null, res);
                    }
        }
    )
}

function handle_flights(msg, callback){
    var res = {};
    var message = "";
    var nextMonth = "02";
    var nextYear = msg.year;
    var thisMonth = "01";
    var arr = [];
    console.log("In handle request:" + JSON.stringify(msg));
    Bill.aggregate(
        [
            {
                // bill_date :{$month:}
                $match:{"flight.flight_operator_name":msg.hotelName, "bill_type":"Flight"}
            },
            {
                $group:{_id:{month:{$month:"$bill_date"}}, total:{$sum:"$flight.amount"}}
            }
        ], function(err, hotels){
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else{
                res.code = "201"
                res.data = hotels;
                console.log(hotels);
                callback(null, res);
            }
        }
    )


}

function handle_cars(msg, callback){
    var res = {};
    var message = "";
    var nextMonth = "02";
    var nextYear = msg.year;
    var thisMonth = "01";
    var arr = [];
    console.log("In handle request:" + JSON.stringify(msg));
    Bill.aggregate(
        [
            {
                // bill_date :{$month:}
                $match:{"car.car_type":msg.hotelName, "bill_type":"Car"}
            },
            {
                $group:{_id:{month:{$month:"$bill_date"}}, total:{$sum:"$car.amount"}}
            }
        ], function(err, hotels){
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else{
                res.code = "201"
                res.data = hotels;
                console.log(hotels);
                callback(null, res);
            }
        }
    )


}

function top_hotels(msg, callback){
    var res = {data :{}};

    var message = "";
    var year = msg.year;
    var month = msg.month;
    var arrName = [];
    var arrAmount = [];
    console.log("In handle request:" + JSON.stringify(msg));
    // Bill.aggregate(
    //     [
    //         {
    //             $project:{year:{$year:"$bill_date"}, bill_type:"$bill_type", name:"$hotel.hotel_name"},
    //         },
    //         {
    //             $match:{year:parseInt(msg.year)}
    //         }
    //     ]
    Bill.aggregate(
        [
            {
                $project: {name: "$hotel.hotel_name", bill_date:"$bill_date", amount:"$hotel.amount"}


            },
            {
            $match: {
                "bill_date": {$gte: new Date(msg.year+"-01-01T00:00:00.000Z"), $lte: new Date(msg.year+"-12-31T23:59:59.000Z")},
                //"bill_type": "Hotel"
            }
        },
            {
                $group:{_id:"$name", total:{$sum:"$amount"}}
            },
            {
                $sort:{total:-1}
            },
            {
                $limit:5
            }
        ]

        , function(err, hotels){
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else{
                res.code = "201"
                //res.data = hotels;
                //console.log(hotels);
                var j = 0;
                var len = hotels.length
                hotels.forEach(eachHotel=>{
                    arrName.push(eachHotel._id)
                    arrAmount.push(eachHotel.total)
                    if(j==(len -1)){

                        res.data.label = arrName;
                        res.data.values = arrAmount;
                        console.log("names", arrName)

                        callback(null, res);
                    }
                    j++;
                })
            }
        })
}

function top_flights(msg, callback){
    var res = {data :{}};

    var message = "";
    var year = msg.year;
    var month = msg.month;
    var arrName = [];
    var arrAmount = [];
    console.log("In handle request:" + JSON.stringify(msg));
    // Bill.aggregate(
    //     [
    //         {
    //             $project:{year:{$year:"$bill_date"}, bill_type:"$bill_type", name:"$hotel.hotel_name"},
    //         },
    //         {
    //             $match:{year:parseInt(msg.year)}
    //         }
    //     ]
    Bill.aggregate(
        [
            {
                $project: {name: "$flight.flight_operator_name", bill_date:"$bill_date", amount:"$flight.amount"}


            },
            {
                $match: {
                    "bill_date": {$gte: new Date(msg.year+"-01-01T00:00:00.000Z"), $lte: new Date(msg.year+"-12-31T23:59:59.000Z")},
                    //"bill_type": "Hotel"
                }
            },
            {
                $group:{_id:"$name", total:{$sum:"$amount"}}
            },
            {
                $sort:{total:-1}
            },
            {
                $limit:5
            }
        ]

        , function(err, hotels){
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else{
                res.code = "201"
                //res.data = hotels;
                //console.log(hotels);
                var j = 0;
                var len = hotels.length
                hotels.forEach(eachHotel=>{
                    arrName.push(eachHotel._id)
                    arrAmount.push(eachHotel.total)
                    if(j==(len-1 )){
                        res.data.label = arrName;
                        res.data.values = arrAmount;
                        console.log("names", arrName)

                        callback(null, res);
                    }
                    j++;
                })
            }
        })
}

function top_cars(msg, callback){
    var res = {data :{}};

    var message = "";
    var year = msg.year;
    var month = msg.month;
    var arrName = [];
    var arrAmount = [];
    console.log("In handle request:" + JSON.stringify(msg));
    // Bill.aggregate(
    //     [
    //         {
    //             $project:{year:{$year:"$bill_date"}, bill_type:"$bill_type", name:"$hotel.hotel_name"},
    //         },
    //         {
    //             $match:{year:parseInt(msg.year)}
    //         }
    //     ]
    Bill.aggregate(
        [
            {
                $project: {name: "$car.car_type", bill_date:"$bill_date", amount:"$car.amount"}


            },
            {
                $match: {
                    "bill_date": {$gte: new Date(msg.year+"-01-01T00:00:00.000Z"), $lte: new Date(msg.year+"-12-31T23:59:59.000Z")},
                    //"bill_type": "Hotel"
                }
            },
            {
                $group:{_id:"$name", total:{$sum:"$amount"}}
            },
            {
                $sort:{total:-1}
            },
            {
                $limit:5
            }
        ]

        , function(err, hotels){
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else{
                res.code = "201"
                //res.data = hotels;
                //console.log(hotels);
                var j = 0;
                var len = hotels.length
                hotels.forEach(eachHotel=>{
                    arrName.push(eachHotel._id)
                    arrAmount.push(eachHotel.total)
                    if(j==(len - 1)){
                        res.data.label = arrName;
                        res.data.values = arrAmount;
                        console.log("names", arrName)

                        callback(null, res);
                    }
                    j++;
                })
            }
        })
}

function citywise_revenue(msg, callback){
    var res = {data :{}};

    var message = "";
    var year = msg.year;
    var month = msg.month;
    var arrName = [];
    var arrAmount = [];
    console.log("In handle request:" + JSON.stringify(msg));
    Bill.aggregate(
        [
            {
                $project: {name: "$hotel.city", bill_date:"$bill_date", amount:"$hotel.amount"}


            },
            {
                $match: {
                    "bill_date": {$gte: new Date(msg.year+"-01-01T00:00:00.000Z"), $lte: new Date(msg.year+"-12-31T23:59:59.000Z")},
                    //"bill_type": "Hotel"
                }
            },
            {
                $group:{_id:"$name", total:{$sum:"$amount"}}
            },
            {
                $sort:{total:-1}
            },
            {
                $limit:5
            }
        ]

        , function(err, hotels){
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else{
                res.code = "201"
                //res.data = hotels;
                //console.log(hotels);
                var j = 0;
                var len = hotels.length
                hotels.forEach(eachHotel=>{
                    arrName.push(eachHotel._id)
                    arrAmount.push(eachHotel.total)
                    if(j==(len - 1)){
                        res.data.label = arrName;
                        res.data.values = arrAmount;
                        console.log("names", arrName)

                        callback(null, res);
                    }
                    j++;
                })
            }
        })
}

exports.citywise_revenue = citywise_revenue;
exports.handle_hotels = handle_hotels;
exports.handle_flights = handle_flights;
exports.handle_cars = handle_cars;
exports.top_hotels = top_hotels;
exports.top_flights = top_flights;
exports.top_cars = top_cars;
