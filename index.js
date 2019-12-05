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
      fileString += ques1 + " /n ";
    }
    if(ques2 != ''){
      fileString += ques2 + " /n ";
    }
    if(ques3 != ''){
      fileString += ques3 + " /n ";
    }
    if(ques4 != ''){
      fileString += ques4 + " /n ";
    }
    if(ques5 != ''){
      fileString += ques5;
    }
    var fs = require('fs');
    fs.writeFile("public/Surveys/" + randNum + '.js', " survey \n" + fileString, function(err) {
      if(err) throw err;
      res.render('pages/creating');
    });
  })
  .get('/home', (req, res) => res.render('pages/home'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
