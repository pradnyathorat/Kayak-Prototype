var express = require('express');
var router = express.Router();
var passport = require('passport');
require('./passport')(passport);

var fs = require('fs');
var path = require('path');
var dateTime = require('node-datetime');
var dt = dateTime.create();

router.post('/', (req,res,next)=>{
    console.log("request: " +req.body.email);
    console.log("request: " +JSON.stringify(req.body));


    var logger = fs.createWriteStream(path.join(__dirname, '../') + 'login_log.csv', {
        flags: 'a'
    })
    logger.write(`\r\n${req.body.email}` + ','+new Date(dt.now())+','+'1');

    passport.authenticate('login', function(err, user) {
        if(err) {
            res.status(500).send();
        }

        if(!user) {
            res.status(401).send();
        }
        else{
            req.session.email = user.loginData.email;
            req.session.cookie.maxAge = 30 * 60 * 1000;

            console.log("session initilized");
            return res.status(201).send(user);
        }
    })(req, res);
});

module.exports = router; 