var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Reviews = new Schema({
	bill_id : String,
	email: String,
	rating : Number,
	comment : String,
	booking_type : String,
    hotel_id : String,
    flight_id : String,
    car_id : String
});
module.exports = mongoose.model("Reviews",Reviews);