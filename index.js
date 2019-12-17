const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/create', (req, res) => res.render('pages/create'))
  .get('/createSurvey', (req, res) => {
    var randNum = req.query['id'] || '';
    var ques1 = req.query['q1'] || '';
    var ques2 = req.query['q2'] || '';
    var ques3 = req.query['q3'] || '';
    var ques4 = req.query['q4'] || '';
    var ques5 = req.query['q5'] || '';
    var fileString = "";
    if(ques1 != ''){
      fileString += ques1 + ' \n';
    }
    if(ques2 != ''){
      fileString += ques2 + ' \n';
    }
    if(ques3 != ''){
      fileString += ques3 + ' \n';
    }
    if(ques4 != ''){
      fileString += ques4 + ' \n';
    }
    if(ques5 != ''){
      fileString += ques5;
    }
    var fs = require('fs');
    fs.writeFile("public/Surveys/" + randNum + '.js', " survey \n" + fileString, function(err) {
      if(err) throw err;
      var dir = 'public/Answers/' + randNum;
      var mkdirp = require('mkdirp');
      mkdirp(dir, function(err){
        if(err) throw err;
        console.log("Made dir " + dir);
        res.render('pages/creating');
      });
    });
  })
  .get('/createEmail', (req, res) => {
    var id = req.query['id'] || '';
    var email = req.query['email'] || '';
    var Cryptr = require('cryptr');
    var cryptr = new Cryptr("secreeeetkeyyyyyyyyyyyyyyyyyyyyyyoksecretttttttttttttttt");
    var emailEncrypted = cryptr.encrypt(email);
    var fs = require('fs');
    fs.writeFile("public/Emails/" + id + ".js", emailEncrypted, function(err){
      if(err) throw err;
      console.log("wrote file public/Emails/" + id + ".js" + " => " + emailEncrypted);
      res.render('pages/createdEmail');
    })
  })
  .get('/home', (req, res) => res.render('pages/home'))
  .get('/submit', (req, res) => {
    var randNum = req.query['id'] || '';
    var ans1 = req.query['a1'] || '';
    var ans2 = req.query['a2'] || '';
    var ans3 = req.query['a3'] || '';
    var ans4 = req.query['a4'] || '';
    var ans5 = req.query['a5'] || '';
    var fileString = "";
    if(ans1 != ''){
      fileString += ans1 + ' \n';
    }
    if(ans2 != ''){
      fileString += ans2 + ' \n';
    }
    if(ans3 != ''){
      fileString += ans3 + ' \n';
    }
    if(ans4 != ''){
      fileString += ans4 + ' \n';
    }
    if(ans5 != ''){
      fileString += ans5;
    }
    var answerId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    var Cryptr = require('cryptr');
    var cryptr = new Cryptr("secreeeetkeyyyyyyyyyyyyyyyyyyyyyyoksecretttttttttttttttt");
    var fs = require('fs');
    fs.writeFile("public/Answers/"+ randNum + "/" + answerId + '.js', fileString, function(err) {
      if(err) throw err;
      fs.access("public/Emails/" + randNum + ".js", fs.constants.F_OK, (err) => {
        if(err) throw err;
        console.log("public/Emails/" + randNum + ".js exists");
        fs.readFile("public/Emails/" + randNum + ".js", 'utf8', function(err, contents) {
          if(err) throw err;
          console.log("contents => " + contents);
          var email = cryptr.decrypt(contents);
          var nodemailer = require('nodemailer');

          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'easelsurveys@gmail.com',
              pass: 'Black&&White'
            }
          });

          var mailOptions = {
            from: 'easelsurveys@gmail.com',
            to: email,
            subject: 'Somebody answered your survey!',
            text: 'You can view your answers here: https://easel123.herokuapp.com/answers?id=' + randNum
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.render('pages/submit');
            }
          });
        });
      });
    });
  })
  .get('/answers', (req, res) => {
    var fs = require('fs');
    var allAnswers = [];
    fs.readdirSync('public/Answers/' + req.query['id']).forEach(file => {
      console.log(file);
      allAnswers.push(file);
    });
    var allAnswersFixed = "'" + allAnswers.join("','") + "'";
    console.log(allAnswersFixed);
    res.render('pages/answers', {msg: allAnswersFixed});
  })
  .get('/created', (req,res) => {
    res.render('pages/created');
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
