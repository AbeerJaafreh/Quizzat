const mongoose = require("mongoose")
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/QuizeApp', { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", function () {
    console.log("mongoose connection error");
    console.log("________________________________________");
});
db.once("open", function () {
    console.log("mongoose connected successfully");
    console.log("________________________________________");
});
const User = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    score: Number,
    gold: Number,
    hint: Number,
    extraLife: Number
})

const Question = new mongoose.Schema({
    field: String,
    question: String,
    answers: {
        option1: String,
        option2: String,
        option3: String,
        option4: String,
    },
    correctIndex: String
})

const StoreItems = new mongoose.Schema({
    name: String,
    cost: Number
});

let Users = mongoose.model("Users", User)
let Questions = mongoose.model("Questions", Question)
let Store = mongoose.model("Store", StoreItems)


// USERS

// INSERT USERS - ABEER & MOHAMMAD
let insertUser = (cb, obj) => {
    Users.create(obj, (err, doc) => {
        if (err) {
            console.log("ERR:", err);
        }
        else {
            cb(doc)
        }
    })
}

// SHOW USERS - MOHAMMAD 
const getUsers = sendUsers => {
    Users.find({}, { password: 0 }, (err, docs) => {
        if (err) {
            console.log("ERR:", err);
        }
        else {
            sendUsers(docs);
        }
    }).sort({ score: -1 })
};

// GET LOGGED IN USER - MOHAMMAD
const getLoggedInUser = sendUser => {
    Users.findOne({ _id: "5dc8532d5be36d93af744aca" }, { password: 0 }, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            // console.log("User:", doc)
            sendUser(doc);
        }
    })
};


// UPDATE USER - MOHAMMAD
const updateUser = (sendUser, user) => {
    let _id = user.body._id
    let name = user.body.name
    let email = user.body.email
    // console.log("Update User Pressed In Database")
    // console.log("USER DATA IN DATABASE:", user.body)
    Users.updateOne(
        { _id },
        { $set: { name, email } },
        (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                sendUser(doc);
            }
        }
    );
};



//QUESTIONS

// INSERT QUESTION - ABEER & MOHAMMAD
let insertQuestion = (cb, obj) => {
    Questions.create(obj, (err, doc) => {
        if (err) {
            console.log("ERR:", err);
        }
        else {
            cb(doc)
        }
    })
}



// GET QUESTIONS
const getQuestions = (sendQuestions, obj) => {
    let field = obj.field
    Questions.find({ field }
        , (err, docs) => {
            if (err) {
                console.log("ERROR: ", err)
            }
            else {
                sendQuestions(docs)
            }
        }
    )
}
// db.yourCollection.find().limit(-1).skip(yourRandomNumber).next()

const validateAnswer = (sendResult, obj) => {
    let _id = obj._id
    Users.updateOne(
        { _id }, { gold: obj.gold + 1, }, (err, doc) => {
            if (err) {
                console.log("ERROR: ", err)
            }
            else {
                sendResult(doc)
            }
        }
    )
}


// LEVEL COMPLETE

const levelComplete = (level, obj) => {
    let _id = obj._id
    let score = obj.score
    console.log('LEVEL COMPLETE')
    console.log("ID : ", _id, "SCORE : ", score)
    Users.updateOne(
        { _id },
        { score: score + 200 }, (err, doc) => {
            if (err) {
                console.log('ERROR :', err)
            }
            else {
                level(doc)
            }
        }
    )
}




// STORE

// GET SOTRE ITEMS
const getStoreItems = sendStoreItems => {
    Store.find({}, (err, docs) => {
        // console.log("IN DATA  BASE", docs)
        if (err) {
            console.log("ERR:", err);
        }
        else {
            sendStoreItems(docs);
        }
    });
};



// BUY ITEM 
const updateOwenedItes = (sendItem, obj) => {
    // console.log("BUY ITEM IN DB", obj)
    let _id = obj._id
    let goldAfterBuy = obj.goldAfterBuy
    let itemName = obj.itemName
    let hintHave = obj.hintHave
    let extraLifeHave = obj.extraLifeHave
    console.log(_id, goldAfterBuy, itemName)
    console.log(" ITEMS HAVE", hintHave, extraLifeHave)
    Users.updateMany(
        { _id },
        {
            $set: {
                gold: goldAfterBuy,
                hint: hintHave,
                extraLife: extraLifeHave
            }
        },
        (err, doc) => {
            if (err) {
                console.log("ERR", err)
            }
            else {
                sendItem(doc)
            }
        }
    )
}




module.exports = {
    insertUser,
    getUsers,
    getLoggedInUser,
    updateUser,

    insertQuestion,
    getQuestions,
    validateAnswer,
    levelComplete,


    getStoreItems,
    updateOwenedItes,
};


// {
//     name: "Abeer",
//     email: "abeer@gmail.com",
//     password:12345,
//     score: 2000,
//     gold: 200,
//     hint: 0,
//     extraLife: 0
// },
// {
//     name: "Mohammad Alaa Aldein",
//     email: "mohammad@gmail.com",
//     password:12345,
//     score: 2500,
//     gold: 500,
//     hint: 0,
//     extraLife: 0
// },
// {
//     name: "Ayham",
//     email: "ayham@gmail.com",
//     password:12345,
//     score: 2000,
//     gold: 500,
//     hint: 0,
//     extraLife: 0
// },
// {
//     name: "Ahmad",
//     email: "ahmad@gmail.com",
//     password:12345,
//     score: 1500,
//     gold: 500,
//     hint: 0,
//     extraLife: 0
// },

