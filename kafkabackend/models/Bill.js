var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bill = new Schema({

    bill_id: String,
    bill_date:Date,
    bill_type:String,
    email : String,
    bill_amount:Number,
    bill_status:String,
    flight :
        {
            flight_id : String,
            flight_name : String,
            flight_operator_name:String,
            flight_start_date: Date,
            flight_end_date: Date,
            origin:String,
            destination:String,
            class_type:String,
            no_of_travelers : Number,
            amount: Number,
            notes: String

        },
    hotel :
        {
            hotel_id : String,
            hotel_name : String,
            city: String,
            state:String,
            booking_start_date: Date,
            booking_end_date: Date,
            amount: Number,
            no_of_guests : Number,
            no_of_rooms: Number,
            room_type:String,
            notes: String
        },
    car :
        {
            car_id : String,
            booking_start_date: Date,
            booking_end_date: Date,
            amount: Number,
            car_name : String,
            car_type : String,
            model_name : String,
            city : String,
            notes: String
        }

});

module.exports = mongoose.model("Bill", Bill);