var currentAmountQuestions = 0;

function updateList(){
  if(currentAmountQuestions < 5){
    currentAmountQuestions += 1;
    document.getElementById("listBox").style="height:" + ((currentAmountQuestions * 9) + 10) + "vh";
    document.getElementById("addQuestion").style="left:40%;width:15%;height:7vh;padding-top:0%;top:" + (((currentAmountQuestions+1)*9)-7) + "vh;";
    document.getElementById("questionBox" + currentAmountQuestions).removeAttribute("hidden");
  }
}

function createSurvey(){
  var randNumStr = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  require(['fs'], function(fs){
    fs.writeFile("Surveys/" + randNumStr + '.js', " survey \n" + document.getElementById('question1Input').value + " \n" + document.getElementById('question2Input').value + " \n" + document.getElementById('question3Input').value + " \n" + document.getElementById('question4Input').value + " \n" + document.getElementById('question5Input').value, function(err) {
      if(err) throw err;
      console.log("Created " + randNumStr);
    });
  });
}

setTimeout(() => {updateList();}, 100);
