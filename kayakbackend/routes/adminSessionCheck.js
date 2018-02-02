var express = require('express');
var router = express.Router();

router.post('/', (req,res,next)=>{

    //console.log("User is here: "+req.session.username + "  and : "+req.body.username);
    if(req.session.cookie && req.session.email ){
        return res.status(201).send();
    }
    else{
        return res.status(202).send();
    }
        
});

module.exports = router; 