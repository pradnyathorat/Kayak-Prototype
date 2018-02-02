var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Admin = new Schema({
	admin_id : String,
	first_name: String,
	middle_name: String,
	last_name : String,
	gender : String,
	email: String,
	is_email_verified: Boolean,
	password : String,
	address : 
	{
		street: String,
		state: String,
		city:String,
		zip_code:String,
		country:String
	},
	phone : Number,
	user_status : String
});

Admin.methods.isActive = function(admin) {
	console.log("checking if active:"+(admin.user_status == "active"));
	return admin.user_status == "active";
};

module.exports = mongoose.model("Admin", Admin);