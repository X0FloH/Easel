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
    var randNum = req.query['id'] || ' ';
    var ques1 = req.query['q1'] || ' ';
    var ques2 = req.query['q2'] || ' ';
    var ques3 = req.query['q3'] || ' ';
    var ques4 = req.query['q4'] || ' ';
    var ques5 = req.query['q5'] || ' ';
    var fs = require('fs');
    fs.writeFile("public/Surveys/" + randNum + '.js', " survey \n" + ques1 + " \n" + ques2 + " \n" + ques3 + " \n" + ques4 + " \n" + ques5, function(err) {
      if(err) throw err;
      setTimeout(() => {res.redirect('https://easel123.herokuapp.com/?survey=' + randNum);}, 1000);

    });
    res.render('pages/creating');
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
