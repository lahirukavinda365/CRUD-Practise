const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();

app.use(cors())
app.use(express.json())

const dbConnect = module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    }

    try {
      mongoose.connect('mongodb+srv://lahirukavinda365:crudpractise@cluster0.yljrri3.mongodb.net/?retryWrites=true&w=majority', connectionParams);
      console.log("DB connected....");
    } catch (error) {
        console.log(error);
        console.log("DB connection failed");
    }
}

dbConnect();

// CRUD 
//get request get users
app.get('/', (req,res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

//get request to get a user

app.get('/getUser/:id', (req,res) => {
    const id = req.params.id;

    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;

    UserModel.findByIdAndUpdate({_id:id}, {
        name:req.body.name,
        email:req.body.email,
        age:req.body.age
    })
    .then( users => res.json(users))
    .catch(err => res.json(err))
})



// post request for create a record
app.post("/createUser", (req,res) => {
    UserModel.create(req.body)
    .then(users => {
        res.json(users)
    
    })
    .catch(err => res.json(err))
});

app.listen(3001, () => {
    console.log("sever running");
})






