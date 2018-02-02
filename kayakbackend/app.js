var express = require('express');
var favicon = require('serve-favicon')
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
require('./routes/passport')(passport);
const fileUpload = require('express-fileupload');

var routes = require('./routes/index');
var mongoSessionURL = "mongodb://54.183.101.173:27017/sessions";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);

var signup = require('./routes/signup');
var signupAdmin = require('./routes/signupAdmin');


var login = require('./routes/login');
var loginAdmin = require('./routes/loginAdmin');

var addHotelAdmin = require('./routes/addHotelAdmin');
var getAllHotel = require('./routes/getAllHotel');
var updateHotelAdmin = require('./routes/updateHotelAdmin');
var searchHotelAdmin = require('./routes/searchHotelAdmin');
var deleteHotelAdmin = require('./routes/deleteHotelAdmin');

var addFlightAdmin = require('./routes/addFlightAdmin');
var getAllFlight = require('./routes/getAllFlight');
var updateFlightAdmin = require('./routes/updateFlightAdmin');
var searchFlightAdmin = require('./routes/searchFlightAdmin');
var deleteFlightAdmin = require('./routes/deleteFlightAdmin');


var addCarAdmin = require('./routes/addCarAdmin');
var getAllCar = require('./routes/getAllCar');
var updateCarAdmin = require('./routes/updateCarAdmin');
var searchCarAdmin = require('./routes/searchCarAdmin');
var deleteCarAdmin = require('./routes/deleteCarAdmin');


var getAllUserDataAdmin = require('./routes/getAllUserDataAdmin');
var searchUserDataAdmin = require('./routes/searchUserDataAdmin');
var updateUserDataAdmin = require('./routes/updateUserDataAdmin');
var deleteUserDataAdmin = require('./routes/deleteUserDataAdmin');

var getAllBillAdmin = require('./routes/getAllBillAdmin');
var searchBillDateAdmin = require('./routes/searchBillDateAdmin');
var searchBillMonthAdmin = require('./routes/searchBillMonthAdmin');


var sessioncheck = require('./routes/sessioncheck');
var adminSessioncheck = require('./routes/adminSessionCheck');
var logout = require('./routes/logout');
var getcount = require('./routes/getcount');

var updateUserInfo = require('./routes/updateUserInfo');
var getUserDetails = require('./routes/getUserDetails');
var updateCardDetails = require('./routes/updateCardDetails');
var getCardDetails = require('./routes/getCardDetails');
var hotels = require('./routes/hotels');
var flights = require('./routes/flights');
var cars = require('./routes/cars');
var deleteAccount = require('./routes/deleteAccount');
var bookings = require('./routes/getBookings');
var topTenCar = require('./routes/topTenCar');
var topTenFlight = require('./routes/topTenFlight');
var topTenHotel = require('./routes/topTenHotel');
var createReview = require('./routes/createReview');

var getRevenue = require('./routes/getRevenue');
var adminLogout = require('./routes/adminLogout');

var app = express();

//redis
var redis = require('redis');
var redisClient = redis.createClient({host : 'localhost', port : 6379});

redisClient.on('ready',function() {
    console.log("Redis is ready");
});

redisClient.on('error',function() {
    console.log("Error in Redis");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(fileUpload());

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));
app.use(passport.initialize());

app.use('/', routes);

app.use('/login', login);
app.use('/loginAdmin', loginAdmin);

app.use('/addHotelAdmin', addHotelAdmin);
app.use('/getAllHotel', getAllHotel);
app.use('/updateHotelAdmin', updateHotelAdmin);
app.use('/searchHotelAdmin', searchHotelAdmin);
app.use('/deleteHotelAdmin', deleteHotelAdmin);

app.use('/addFlightAdmin', addFlightAdmin);
app.use('/getAllFlight', getAllFlight);
app.use('/updateFlightAdmin', updateFlightAdmin);
app.use('/searchFlightAdmin', searchFlightAdmin);
app.use('/deleteFlightAdmin', deleteFlightAdmin);


app.use('/addCarAdmin', addCarAdmin);
app.use('/getAllCar', getAllCar);
app.use('/updateCarAdmin', updateCarAdmin);
app.use('/searchCarAdmin', searchCarAdmin);
app.use('/deleteCarAdmin', deleteCarAdmin);

app.use('/getAllUserDataAdmin', getAllUserDataAdmin);
app.use('/searchUserDataAdmin', searchUserDataAdmin);
app.use('/updateUserDataAdmin', updateUserDataAdmin);
app.use('/deleteUserDataAdmin', deleteUserDataAdmin);

app.use('/getAllBillAdmin', getAllBillAdmin);
app.use('/searchBillDateAdmin', searchBillDateAdmin);
app.use('/searchBillMonthAdmin', searchBillMonthAdmin);


app.use('/signup',signup);
app.use('/signupAdmin',signupAdmin);

app.use('/sessioncheck',sessioncheck);

app.use('/adminSessioncheck',adminSessioncheck);
app.use('/adminLogout', adminLogout);

app.use('/logout', logout);
app.use('/updateUserInfo',updateUserInfo);
app.use('/getUserDetails',getUserDetails);
app.use('/updateCardDetails',updateCardDetails);
app.use('/getCardDetails',getCardDetails);
app.use('/hotels', hotels);
app.use('/flights', flights);
app.use('/cars', cars);
app.use('/getbookings', bookings);
app.use('/deleteAccount', deleteAccount);
app.use('/topTenCar', topTenCar);
app.use('/topTenFlight', topTenFlight);
app.use('/topTenHotel', topTenHotel);
app.use('/getRevenue', getRevenue);
app.use('/createReview', createReview);
app.use('/getcount',getcount);
module.exports = app;