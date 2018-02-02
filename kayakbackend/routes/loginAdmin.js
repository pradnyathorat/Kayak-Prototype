var express = require('express');
var router = express.Router();
var passport = require('passport');
require('./passport')(passport);

router.post('/', (req,res,next)=>{
    console.log("request: " +req.body.email);
    console.log("request: " +JSON.stringify(req.body));
    passport.authenticate('loginAdmin', function(err, admin) {
        if(err) {
            res.status(500).send();
        }
        if(!admin) {
            res.status(401).send();
        }
        else{
            req.session.email = admin.loginData.email;
            req.session.cookie.maxAge = 30 * 60 * 1000;

            console.log("Admin Session Started");
            return res.status(201).send(admin);
        }
    })(req, res);
});

module.exports = router; 