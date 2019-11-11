var express = require("express");
var cors = require("cors");
var app = express();
const DB = require('./db');
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json(`server working`);
})








// USERS

// INSERT USERS - ABEER & MOHAMMAD
app.post("/insertUser", (req, res) => {
  DB.insertUser(user => {
    res.json(user);
  }, req.body);

});



// GET ALL USERS - MOHAMMAD
app.get(`/getUsers`, (req, res) => {
  DB.getUsers(users => res.json(users));
});




// GET LOGGED IN USER - MOHAMMAD
app.get(`/getLoggedInUser`, (req, res) => {
  DB.getLoggedInUser(user => res.json(user)
  );
});


// UPDATA USER - MOHAMMAD 
app.post(`/updateUser`, (req, res) => {
  DB.updateUser(user => res.json(user), req)
});




















// QUSERIONS

// INSERT QUESTIONS - ABEER & MOHAMMAD
app.post("/insertQuestion", (req, res) => {
  DB.insertQuestion(question => {
    res.json(question);
  }, req.body);

});


// GETQUESTIONS
app.post('/getQuestions', (req, res) => {
  DB.getQuestions(questions => {
    res.json(questions);
  }, req.body);
})


// VALIDATEANSWER

app.post('/validateAnswer', (req, res) => {
  DB.validateAnswer(result => {
    res.json(result)
  }, req.body)
})


//  LEVEL COMPLETE
app.post('/levelComplete', (req, res) => {
  DB.levelComplete(level => {
    res.json(level)
  }, req.body)
})




//SOTRE

// GET STORE ITEMS
app.get("/getStoreItems", (req, res) => {
  // console.log("GET STORE ITEMS IN SERVER", req.body)
  DB.getStoreItems(items => res.json(items)
  )
})


// BUY ITEM
app.post('/updateOwenedItes', (req, res) => {
  // console.log("BUY IN SERVER", req.body)
  DB.updateOwenedItes(item => res.json(item)
    , req.body)
})




var port = process.env.PORT || 9000;
app.listen(port, function () {
  console.log("Server is running on port: " + port);
});
