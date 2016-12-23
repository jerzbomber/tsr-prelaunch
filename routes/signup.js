var express = require('express');
var https = require('https');
var Mailchimp = require('mailchimp-api-v3');
var winston = require('winston');

var logger = new (winston.Logger) ({
    transports: [
        new (winston.transports.File) ({
            filename: './data/signups.log',
            level: 'info',
            json: true,
            timestamp: true
        })
    ]
});

var router = express.Router();

/* POST signup */
router.post('/', function(req, res, next) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    logger.info({firstName: firstName, lastName: lastName, email: email });

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
        logger.info({
            email: email,
            firstName: firstName,
            lastName: lastName,
            mcRes: mc_res
        });
        res.send({});
    })
    .catch((mc_err) => {
        logger.error({
            email: email,
            firstName: firstName,
            lastName: lastName,
            mcError: mc_err
        });
        res.send({error: mc_err});
    });
});

module.exports = router;
