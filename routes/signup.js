var express = require('express');
var https = require('https');
var router = express.Router();
var Mailchimp = require('mailchimp-api-v3');

/* POST signup */
router.post('/', function(req, res, next) {
    console.log('posted to signup');
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var mailchimp = new Mailchimp('e38f501cba4f367f64b24dce8acb9459-us14');

    var mc_body = {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }
    }

    //e38f501cba4f367f64b24dce8acb9459-us14

    var dataString = JSON.stringify(mc_body);

    mailchimp.post('/lists/028512e42c/members', mc_body)
    .then((mc_res) => {
        console.log('RECEIVED:', mc_res);
        res.send({});
    })
    .catch((mc_err) => {
        console.log('ERROR:', mc_err);
        res.send({error: mc_err});
    });
    // {
    //     path: '/lists/028512e42c/members',

    // })

    // var headers = {
    //     'Content-Type': 'application/json',
    //     'Content-Length': dataString.length
    // };

    // var options = {
    //     hostname: 'us14.admin.mailchimp.com/3.0/lists/028512e42c/members',
    //     port: 443,
    //     path: '/',
    //     method: 'POST',
    //     auth: 'jerzbomber1:e38f501cba4f367f64b24dce8acb9459-us14',
    //     headers: headers
    // };

    // var mc_req = https.request(options, (mc_res) => {
    //     console.log('statusCode:', mc_res.statusCode);
    //     console.log('headers:', mc_res.headers);

    //     mc_res.on('data', (d) => {
    //         console.log(d);
    //     });

    //     mc_res.on('end', () => {
    //         console.log('mc_res.end');
    //         res.send({});
    //     });
    // }); 

    // mc_req.on('error', (e) => {
    //     console.error(e);
    //     res.send({error: e});
    // });

    // mc_req.write(dataString)
    // mc_req.end();
});

module.exports = router;
