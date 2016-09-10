var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var jade = require('jade');
var fs = require('fs');
var template = fs.readFileSync('./views/index.jade', 'utf-8');
var compiledTemplate = jade.compile('template');


router.get ('/', function(req, res) {
var options = {
  auth: {
    api_key: req.query.api
  }
}
var client = nodemailer.createTransport(sgTransport(options));


  var email = {
  from : req.query.from ,
  to: req.query.to,
  subject: req.query.subject,
  // html: compiledTemplate({subject: req.query.subject,text:req.query.text })
  html: jade.renderFile('./views/index.jade',{ subject: req.query.subject,text:req.query.text } )
};

client.sendMail(email, function(err, info){
    if (err ){
      console.log(err);
    }
    else {
      console.log('Message sent: ' + info.response);

	  res.sendStatus(200)
    }
});


});



module.exports = router;
