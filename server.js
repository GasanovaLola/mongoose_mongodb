const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const Schema = mongoose.Schema;

const app = express();

const host = 'localhost';
const port = 5000;

// установка схемы
const userScheme = new Schema({
    balance: String,
    picture: String,
    age: Number,
    name: String,
    gender: String,
    company: String,
    email: String
});
const User = mongoose.model("User", userScheme);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// подключение
mongoose.connect("mongodb+srv://user:user@cluster0.nka5m.mongodb.net/UserMongoose?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true })

app.get('/', (req, res) => {
    User.find({}, function(error, users){
        
        if(error) {
            res.status(404).json({error: error});
        }
        else {
            res.status(200).json(users);
        }
    });
});
app.get('/:userId', (req, res) => {
    const id = req.params.userId;
    User.findById(id, function(error, user){
         
        if(error) {
            res.status(404).json({error: error});
        }
        else {
            res.status(200).json(user);
        }
    });
});
app.post('/', (req, res) => {
    User.create({
            _id: new mongoose.Types.ObjectId(),
            balance: req.body.balance,
            picture: req.body.picture,
            age: req.body.age,
            name: req.body.name,
            gender: req.body.gender,
            company: req.body.company,
            email: req.body.email
        }, function(error, newuser) {
          
        if(error) {
            res.status(404).json({error: error});
        }
        else {
            res.status(200).json(newuser);
        }
    });
});
app.put('/:userId', (req, res) => {
    const id = req.params.userId;
    User.updateOne({_id: id}, {
            balance: req.body.balance,
            picture: req.body.picture,
            age: req.body.age,
            name: req.body.name,
            gender: req.body.gender,
            company: req.body.company,
            email: req.body.email
        }, function(error, newuser){
        if(error) {
            res.status(404).json({error: error});
        }
        else {
            res.status(200).json(newuser);
        }
    });
});
app.delete('/:userId', (req, res) => {
    const id = req.params.userId;
    User.deleteOne({_id: id}, function(error, result){
             
            if(error) {
                res.status(404).json({error: error});
            }
            else {
                res.status(200).json(result);
            }
    });
});
app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`)
});
