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
    var randNum = req.param('id');
    var ques1 = req.param('q1');
    var ques2 = req.param('q2');
    var ques3 = req.param('q3');
    var ques4 = req.param('q4');
    var ques5 = req.param('q5');
    console.log("Trying to create");
    var fs = require('fs');
    fs.writeFile("public/Surveys/" + randNumStr + '.js', " survey \n" + ques1 + " \n" + ques2 + " \n" + ques3 + " \n" + ques4 + " \n" + ques5, function(err) {
      if(err) throw err;
      console.log("Created " + randNumStr);
      window.location.href = "/?survey=" + randNum;
    });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
