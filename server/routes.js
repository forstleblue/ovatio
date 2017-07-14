var express = require('express');
var router = express.Router();

//Server API to get user data for table View
router.get('/userlist', function(req, res){    
    var db = req.db;
    var collection = db.get('ovatio')
    collection.find({},{},function(e,docs){   
        res.send(docs)
    });
})

//Server API to get user data with user ID
router.get('/user/:id', function(req, res) {
    
    var ObjectID = require('mongodb').ObjectID
    var obj_id = new ObjectID(req.params.id)
        
    var db = req.db;    
    var collection = db.get('ovatio')   
    collection.findOne({_id : obj_id}, (function(e, doc) {
        if (e) {
            console.log("error with db: ", e)
        }
        res.send(doc)
    }));

})

//Server API to delete user data with user ID
router.post('/del/:id', function(req, res) {
    var ObjectID = require('mongodb').ObjectID
    var obj_id = new ObjectID(req.params.id)
    var db = req.db;    
    var collection = db.get('ovatio')  

    collection.remove({_id : obj_id},  function(e, doc) {
        if (e) {
            console.log("error with db: ", e)
        }
        
        res.send({"redirect":'/'});
    })
})

//Server API to update user data
router.post('/updateuser/:id', function(req, res) {

    var userData = {
        professional: req.body.professional,
        businessName: req.body.businessName,
        companyId: req.body.companyId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        status: req.body.status,             
        commission: req.body.commission,     
        address: req.body.address,
        secAddress: req.body.secAddress,
        city: req.body.city,
        zipCode: req.body.zipCode,
        email: req.body.email,
        telephone: req.body.telephone,
        country: req.body.country
    }
    
    var ObjectID = require('mongodb').ObjectID
    var obj_id = new ObjectID(req.params.id)
    var db = req.db;    
    var collection = db.get('ovatio')  

    collection.update({_id : obj_id}, {$set: userData},  function(e, doc) {
        if (e) {
            console.log("error with db: ", e)
        }
        
        res.send({"redirect":'/'});
    })
})

//Server API to add new user data
router.post('/adduser', function(req, res) {
    
    // Set our internal DB variable
    var db = req.db;
   
    // get user data from request.
    var userData = {
        professional: req.body.professional,
        businessName: req.body.businessName,
        companyId: req.body.companyId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        status: req.body.status,             
        commission: req.body.commission,     
        address: req.body.address,
        secAddress: req.body.secAddress,
        city: req.body.city,
        zipCode: req.body.zipCode,
        email: req.body.email,
        telephone: req.body.telephone,
        country: req.body.country
    }
    // Set our collection
    var collection = db.get('ovatio');
   
    // Submit to the DB
    collection.insert(userData, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            //res.location("userlist");
            // And forward to success page
            res.send({"redirect":'/'});
        }
    });
    res.send({"redirect":'/'});
});

module.exports = router