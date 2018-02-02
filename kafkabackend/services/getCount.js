var mongoose = require('mongoose');
mongoose.connect('54.183.101.173:27017/kayak');
var Users = require('../models/Users');
var Listings = require('../models/Listings');
var Record = require('../models/Record');

function handle_hotels(msg, callback){
    var res = {data :{}};

    var message = "";
    console.log("In handle request:" + JSONcstringify(msg));
    
    Listings.count({'listing_type':'Hotel'}
        
        , function(err, results){
            console.log(results);
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else{

                res.code = "201";
                res.data = results;
                callback(null, res);
            }
        })
}

function handle_flights(msg, callback){
    var res = {data :{}};

    var message = "";
    console.log("In handle request:" + JSON.stringify(msg));
    
    Listings.count({'listing_type':'Flight'}
        
        , function(err, results){
            console.log(results);
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else{

                res.code = "201";
                res.data = results;
                callback(null, res);
            }
        })


}

function handle_cars(msg, callback){
    var res = {data :{}};

    var message = "";
    console.log("In handle request:" + JSON.stringify(msg));
    
    Listings.count({'listing_type':'Car'}
        
        , function(err, results){
            console.log(results);
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else{

                res.code = "201";
                res.data = results;
                callback(null, res);
            }
        })
}



function handle_record(msg, callback){
    var res = {data :{}};

    var message = "";
    console.log("In handle request:" + JSON.stringify(msg));
    var record = new Record(msg.record);
    record.save({},function(err, product, numAffected){
        if (err) {
            console.log("Some Error Happened while Inserting record");
            res.code = "500";
            res.data = message;
            callback(null, res);
        }
        else {
            message = numAffected + " rows added into record\n" + product;
            console.log(message);
            res.code = "201";
            res.data = "record inserted";
            callback(null, res);
        }
    });

}

function handle_getuserrecord(msg, callback){
    var res = {data :{}};

    var message = "";
    console.log("In handle request:" + JSON.stringify(msg));
    var email = msg.email;
    
    Record.find({"email":email}
    
    , function(err, results){
        console.log(results);
        if(err){
            message="error"
            res.code = "202"
            res.data = message;
            callback(null, res)
        }
        else{

            res.code = "201";
            res.data = results;
            callback(null, res);
        }
    }).sort({'timespent': 1}).limit(10)

}

function handle_usergraph(msg, callback){
    var res = {data :{}};

    var message = "";
    console.log("In handle request:" + JSON.stringify(msg));
    var email = msg.eamil;
    
    Record.aggregate([{
            $match:{"email":email}
        },
        {
            $group:{_id:"$type",total:{$sum:"$timeSpent"}}
        }
    ]
    
    , function(err, results){
        console.log(results);
        if(err){
            message="error"
            res.code = "202"
            res.data = message;
            callback(null, res)
        }
        else{

            res.code = "201";
            res.data = results;
            callback(null, res);
        }
    })

}

function handle_allusergraph(msg, callback){
    var res = {data :{}};

    var message = "";
    console.log("In handle request:" + JSON.stringify(msg));
    
    Record.aggregate([
        {
            $group:{_id:"$type",total:{$sum:"$timeSpent"}}
        }
    ]
    , function(err, results){
        console.log(results);
        if(err){
            message="error"
            res.code = "202"
            res.data = message;
            callback(null, res)
        }
        else{

            res.code = "201";
            res.data = results;
            callback(null, res);
        }
    })

}
function handle_users(msg, callback){
    var res = {data :{}};

    var message = "";
    var data = {};
    console.log("In handle request:" + JSON.stringify(msg));
    
    Users.count({}
        
        , function(err, results){
            console.log(results);
            if(err){
                message="error"
                res.code = "202"
                res.data = message;
                callback(null, res)
            }
            else{

                res.code = "201";
                data.users = results;
                Listings.count({'listing_type':'Hotel'}
        
                , function(err, results){
                    console.log(results);
                    if(err){
                        message="error"
                        res.code = "202"
                        res.data = message;
                        callback(null, res)
                    }
                    else{

                        res.code = "201";
                        data.hotels = results;
                        
                        Listings.count({'listing_type':'Flight'}
        
                        , function(err, results){
                            console.log(results);
                            if(err){
                                message="error"
                                res.code = "202"
                                res.data = message;
                                callback(null, res)
                            }
                            else{

                                res.code = "201";
                                data.flights = results;
                                
                                Listings.count({'listing_type':'Car'}
        
                                , function(err, results){
                                    console.log(results);
                                    if(err){
                                        message="error"
                                        res.code = "202"
                                        res.data = message;
                                        callback(null, res)
                                    }
                                    else{

                                        res.code = "201";
                                        data.cars = results;
                                        res.data = data;
                                        console.log(data);
                                        callback(null, res);
                                    }
                                })
                            }
                        })
                    }
                })
                
            }
        })
}

exports.handle_hotels = handle_hotels;
exports.handle_flights = handle_flights;
exports.handle_cars = handle_cars;
exports.handle_users = handle_users;
exports.handle_record = handle_record;
exports.handle_getuserrecord = handle_getuserrecord;
exports.handle_usergraph = handle_usergraph;
exports.handle_allusergraph = handle_allusergraph;