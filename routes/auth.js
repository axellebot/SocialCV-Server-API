var express = require('express');
var router = express.Router();

var config = require("../config");
var jwt = require('jsonwebtoken');

const User = require('../schemas/user.schema');

router.post('/signup', function (req, res) {
    // let user = new User({
    //      username: req.body.username,
    //      password: req.body.password
    //  });
    //  user.save(function(err, data){
    //      if(err){
    //          return res.json({error: true});
    //      }
    //      res.json({error:false});
    //  })

    res.send(404);
});

// router.post('/setup', function (req, res) {
//     // create a sample user
//     var axel = new User({
//         username: 'axellebot',
//         password: 'test',
//         profile: {
//             firstName: "Axel",
//             lastName: "Le Bot"
//         },
//         role: "ROLE_OWNER"
//     });
//
//     // save the sample user
//     axel.save(function (err) {
//         if (err) throw err;
//         console.log('User saved successfully');
//         res.json({success: true});
//     });
// });

router.post('/authenticate', function (req, res) {
    User
        .findOne({username: req.body.username})
        .exec(function (err, user) {
            if (err) return res.status(500).json({error: true, message: err});
            if (!user) return res.status(404).json({error: true, message: 'User not found!'});
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err) return res.status(500).json({error: true, message: err});
                if (!isMatch) return res.status(404).json({error: true, message: "Password don't match!"});

                var token = jwt.sign(user, config.secret, {
                    expiresIn: 1440 // expires in 1 hour
                });

                if (!token) return res.status(500).json({error: true, "message": "No token provided"});

                res.json({error: false, token: token});
            });
        })
});

module.exports = router;