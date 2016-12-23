var express = require('express');
var https = require('https');
var Mailchimp = require('mailchimp-api-v3');

var router = express.Router();

/* POST signup */
router.post('/', function(req, res, next) {
    console.log('key', process.env.MAILCHIMP_API_KEY);

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);

    var mc_body = {
        email_address: email,
        status: process.env.MAILCHIMP_SIGNUP_STATUS,
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }
    }

    var dataString = JSON.stringify(mc_body);

    mailchimp.post(`/lists/${process.env.MAILCHIMP_LIST_ID}/members`, mc_body)
    .then((mc_res) => {
        res.send({});
    })
    .catch((mc_err) => {
        res.send({error: mc_err});
    });
});

module.exports = router;
