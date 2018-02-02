var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var signup = require('./services/signup');

var loginAdmin = require('./services/loginAdmin');
var signupAdmin = require('./services/signupAdmin');


var addHotelAdmin = require('./services/addHotelAdmin');
var getAllHotel = require('./services/getAllHotel');
var updateHotelAdmin = require('./services/updateHotelAdmin');
var searchHotelAdmin = require('./services/searchHotelAdmin');
var deleteHotelAdmin = require('./services/deleteHotelAdmin');

var addFlightAdmin = require('./services/addFlightAdmin');
var getAllFlight = require('./services/getAllFlight');
var updateFlightAdmin = require('./services/updateFlightAdmin');
var searchFlightAdmin = require('./services/searchFlightAdmin');
var deleteFlightAdmin = require('./services/deleteFlightAdmin');


var addCarAdmin = require('./services/addCarAdmin');
var getAllCar = require('./services/getAllCar');
var updateCarAdmin = require('./services/updateCarAdmin');
var searchCarAdmin = require('./services/searchCarAdmin');
var deleteCarAdmin = require('./services/deleteCarAdmin');

var getAllUserDataAdmin = require('./services/getAllUserDataAdmin');
var searchUserDataAdmin = require('./services/searchUserDataAdmin');
var updateUserDataAdmin = require('./services/updateUserDataAdmin');
var deleteUserDataAdmin = require('./services/deleteUserDataAdmin');

var getAllBillAdmin = require('./services/getAllBillAdmin');
var searchBillDateAdmin = require('./services/searchBillDateAdmin');
var searchBillMonthAdmin = require('./services/searchBillMonthAdmin');

var createReview = require('./services/createReview');

var updateUserInfo = require('./services/updateUserInfo');
var getUserDetails = require('./services/getUserDetails');
var getCardDetails = require('./services/getCardDetails');
var updateCardDetails = require('./services/updateCardDetails');

var signup = require('./services/signup');


var hotels = require('./services/hotels');
var flights = require('./services/flights');
var cars = require('./services/cars');
var getBookings = require('./services/getBookings');
var getRevenue = require('./services/getRevenue');

var getcount = require('./services/getCount');

var add_hotel_admin_topic_name = "add_hotel_admin_topic";
var get_all_hotel_topic_name = "get_all_hotel_topic";
var update_hotel_admin_topic_name = "update_hotel_admin_topic";
var search_hotel_admin_topic_name = "search_hotel_admin_topic";
var delete_hotel_admin_topic_name = "delete_hotel_admin_topic";


var add_flight_admin_topic_name = "add_flight_admin_topic";
var get_all_flight_topic_name = "get_all_flight_topic";
var update_flight_admin_topic_name = "update_flight_admin_topic";
var search_flight_admin_topic_name = "search_flight_admin_topic";
var delete_flight_admin_topic_name = "delete_flight_admin_topic";


var add_car_admin_topic_name = "add_car_admin_topic";
var get_all_car_topic_name = "get_all_car_topic";
var update_car_admin_topic_name = "update_car_admin_topic";
var search_car_admin_topic_name = "search_car_admin_topic";
var delete_car_admin_topic_name = "delete_car_admin_topic";


var get_all_user_data_topic_name = "get_all_user_data_topic";
var search_user_data_admin_topic_name = "search_user_data_admin_topic";
var update_user_data_admin_topic_name = "update_user_data_admin_topic";
var delete_user_data_admin_topic_name = "delete_user_data_admin_topic";

var get_all_bill_admin_topic_name = "get_all_bill_admin_topic";
var search_bill_date_admin_topic_name = "search_bill_date_admin_topic";
var search_bill_month_admin_topic_name = "search_bill_month_admin_topic";

var create_review_topic_name = "create_review_topic";

var login_topic_name = "login_topic";
var signup_topic_name = "signup_topic";

var login_admin_topic_name = "login_admin_topic";
var signup_admin_topic_name = "signup_admin_topic";


var updateUserInfo_topic_name = "updateUserInfo_topic";
var getUserDetails_topic_name = "getUserDetails_topic";
var updateCardDetails_topic_name = "updateCardDetails_topic";
var getCardDetails_topic_name = "getCardDetails_topic";



var delete_user_topic_name = "delete_user_topic";
var hotels_topic = "hotels_topic";
var flights_topic = "flights_topic";
var cars_topic = "cars_topic";
var get_bookings_topic = "get_bookings_topic";
var get_revenue_topic = "get_revenue_topic";
var response_topic_name = "response_topic";
var getcount_topic = "getcount_topic";

var producer = connection.getProducer();

producer.on('ready', function () {
    producer.createTopics([login_topic_name,signup_topic_name,
            response_topic_name, updateUserInfo_topic_name, hotels_topic, flights_topic, cars_topic,
            delete_user_topic_name, add_hotel_admin_topic_name, update_hotel_admin_topic_name,
            add_flight_admin_topic_name, update_flight_admin_topic_name, add_car_admin_topic_name,
            update_car_admin_topic_name, login_admin_topic_name, signup_admin_topic_name,
            get_all_hotel_topic_name, get_all_flight_topic_name, get_all_car_topic_name, getUserDetails_topic_name,
            getCardDetails_topic_name, updateCardDetails_topic_name, search_hotel_admin_topic_name, search_flight_admin_topic_name,
            search_car_admin_topic_name, delete_hotel_admin_topic_name, delete_flight_admin_topic_name, delete_car_admin_topic_name,
            get_all_user_data_topic_name, search_user_data_admin_topic_name, update_user_data_admin_topic_name,
            delete_user_data_admin_topic_name, get_bookings_topic, get_all_bill_admin_topic_name, search_bill_date_admin_topic_name,
            search_bill_month_admin_topic_name, get_revenue_topic, create_review_topic_name,getcount_topic
        ],
        false, function (err, data) {
        });


    var login_consumer = connection.getConsumer(login_topic_name);
    var login_admin_consumer = connection.getConsumer(login_admin_topic_name);

    var updateUserInfo_consumer = connection.getConsumer(updateUserInfo_topic_name);
    var getUserDetails_consumer = connection.getConsumer(getUserDetails_topic_name);
    var getCardDetails_consumer = connection.getConsumer(getCardDetails_topic_name);
    var updateCardDetails_consumer = connection.getConsumer(updateCardDetails_topic_name);

    var add_hotel_admin_consumer = connection.getConsumer(add_hotel_admin_topic_name);
    var get_all_hotel_consumer = connection.getConsumer(get_all_hotel_topic_name);
    var update_hotel_admin_consumer = connection.getConsumer(update_hotel_admin_topic_name);
    var search_hotel_admin_consumer = connection.getConsumer(search_hotel_admin_topic_name);
    var delete_hotel_admin_consumer = connection.getConsumer(delete_hotel_admin_topic_name);

    var add_flight_admin_consumer = connection.getConsumer(add_flight_admin_topic_name);
    var get_all_flight_consumer = connection.getConsumer(get_all_flight_topic_name);
    var update_flight_admin_consumer = connection.getConsumer(update_flight_admin_topic_name);
    var search_flight_admin_consumer = connection.getConsumer(search_flight_admin_topic_name);
    var delete_flight_admin_consumer = connection.getConsumer(delete_flight_admin_topic_name);


    var add_car_admin_consumer = connection.getConsumer(add_car_admin_topic_name);
    var get_all_car_consumer = connection.getConsumer(get_all_car_topic_name);
    var update_car_admin_consumer = connection.getConsumer(update_car_admin_topic_name);
    var search_car_admin_consumer = connection.getConsumer(search_car_admin_topic_name);
    var delete_car_admin_consumer = connection.getConsumer(delete_car_admin_topic_name);


    var get_all_user_data_consumer = connection.getConsumer(get_all_user_data_topic_name);
    var update_user_data_admin_consumer = connection.getConsumer(update_user_data_admin_topic_name);
    var search_user_data_admin_consumer = connection.getConsumer(search_user_data_admin_topic_name);
    var delete_user_data_admin_consumer = connection.getConsumer(delete_user_data_admin_topic_name);

    var get_all_bill_admin_consumer = connection.getConsumer(get_all_bill_admin_topic_name);
    var search_bill_date_admin_consumer = connection.getConsumer(search_bill_date_admin_topic_name);
    var search_bill_month_admin_consumer = connection.getConsumer(search_bill_month_admin_topic_name);

    var create_review_consumer = connection.getConsumer(create_review_topic_name);
    var signup_consumer = connection.getConsumer(signup_topic_name);
    var signup_admin_consumer = connection.getConsumer(signup_admin_topic_name);

    var hotels_topic_consumer = connection.getConsumer(hotels_topic);
    var flights_topic_consumer = connection.getConsumer(flights_topic);
    var cars_topic_consumer = connection.getConsumer(cars_topic);
    var delete_user_topic_consumer = connection.getConsumer(delete_user_topic_name);
    var get_bookings_topic_consumer = connection.getConsumer(get_bookings_topic);
    var get_revenue_topic_consumer = connection.getConsumer(get_revenue_topic);
    var getcount_consumer = connection.getConsumer(getcount_topic);

    console.log('create review server is running');
    create_review_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        createReview.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('login server is running');
    login_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        login.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('login admin server is running');
    login_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        loginAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('signup server is running');
    signup_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        signup.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });


    console.log('signup admin server is running');
    signup_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        signupAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('updateUserInfo server is running');
    updateUserInfo_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        updateUserInfo.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });


    console.log('getUserDetails server is running');
    getUserDetails_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        getUserDetails.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });


    console.log('updateCardDetails server is running');
    updateCardDetails_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        updateCardDetails.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });


    console.log('getCardDetails server is running');
    getCardDetails_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        getCardDetails.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });


    
    console.log('Add Hotel server is running');
    add_hotel_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        addHotelAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });


    console.log('Get all Hotel server is running');
    get_all_hotel_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        getAllHotel.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('Update Hotel server is running');
    update_hotel_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        updateHotelAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('Search Hotel server is running');
    search_hotel_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        searchHotelAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('Delete Hotel server is running');
    delete_hotel_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        deleteHotelAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('Add Flight server is running');
    add_flight_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        addFlightAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('Get all Flight server is running');
    get_all_flight_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        getAllFlight.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('Update Flight server is running');
    update_flight_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        updateFlightAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('Search Flight server is running');
    search_flight_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        searchFlightAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('Delete Flight server is running');
    delete_flight_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        deleteFlightAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });


    console.log('Add Car server is running');
    add_car_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        addCarAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('Get all Car server is running');
    get_all_car_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        getAllCar.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });


    console.log('Update Car server is running');
    update_car_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        updateCarAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });


    console.log('Search Car server is running');
    search_car_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        searchCarAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('Delete Car server is running');
    delete_car_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        deleteCarAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });


    console.log('hotels server is running');
    hotels_topic_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        if(data.data.key == "search"){
            hotels.handle_request(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }
        else if(data.data.key == "book"){
            hotels.handle_booking(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }

    });

    console.log('flights server is running');
    flights_topic_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        if(data.data.key == "search"){
            flights.handle_request(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }

        else if(data.data.key == "book"){
            flights.handle_booking(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }



    });

    console.log('cars server is running');
    cars_topic_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        if(data.data.key == "search"){
            cars.handle_request(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }
        else if(data.data.key == "book"){
            cars.handle_booking(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }

    });

    console.log('delete user server is running');
    delete_user_topic_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        delete_user.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('get booking server is running');
    get_bookings_topic_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        getBookings.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });



    console.log('Get all user data admin server is running');
    get_all_user_data_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        getAllUserDataAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('Search user data admin server is running');
    search_user_data_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        searchUserDataAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });


    console.log('Update user data admin server is running');
    update_user_data_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        updateUserDataAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('get revenue user data admin server is running');
    get_revenue_topic_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        if(data.data.key == "hotels")
        {
            getRevenue.handle_hotels(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }
        else if(data.data.key == "flights"){
            getRevenue.handle_flights(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }
        else if(data.data.key == "cars"){
            getRevenue.handle_cars(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }
        else if(data.data.key == "tophotels"){
            getRevenue.top_hotels(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }
        else if(data.data.key == "topflights"){
            getRevenue.top_flights(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }
        else if(data.data.key == "topcars"){
            getRevenue.top_cars(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }
        else if(data.data.key == "citywise"){
            getRevenue.citywise_revenue(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }

    });

    console.log('delete user data admin server is running');
    delete_user_data_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        deleteUserDataAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });


    console.log('get all bill admin server is running');
    get_all_bill_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        getAllBillAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('Search Bill Date admin server is running');
    search_bill_date_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        searchBillDateAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('Search Bill Month admin server is running');
    search_bill_month_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        searchBillMonthAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('get count admin server is running');
    getcount_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        if(data.data.key == "hotels")
        {
            getcount.handle_hotels(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }
        else if(data.data.key == "flights"){
            getcount.handle_flights(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }
        else if(data.data.key == "cars"){
            getcount.handle_cars(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }
        else if(data.data.key == "users"){
            getcount.handle_users(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }
        else if(data.data.key == "record"){
            getcount.handle_record(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }
        else if(data.data.key == "userrecord10"){
            getcount.handle_getuserrecord(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }
        else if(data.data.key == "usergraph"){
            getcount.handle_usergraph(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }
        else if(data.data.key == "allusergraph"){
            getcount.handle_allusergraph(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }
    });
    
});