const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/library-customer', {useNewUrlParser: true}, () => {
    console.log("mongoose connected")
})
require("./CustomerModel");
const Customer = mongoose.model("Customer");

app.get('/customer',(req,res) => {
    Customer.find().then((customer) => {
        res.json(customer)
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.get('/customer/:id',(req,res) => {
    Customer.findById(req.params.id).then((customer) => {
        if(customer){
            res.json(customer)
        }else{
            res.json("no customer")
        }
    }).catch(err => {
        if(err){
            throw err;
        }
    }) 
})

app.post('/customer',(req,res) => {
    var newCustomer = {
        name:req.body.name,
        age:req.body.age,
        address:req.body.address
    }

    var customer = new Customer(newCustomer)

    customer.save().then((customers) =>{
        res.json(customers)
    }).catch((err) => {
        if(err){
            throw err;
        }
    })

})

app.delete('/customer/:id',(req,res) => {
    Customer.findOneAndRemove(req.params.id).then(() => {
        res.send("Customer removed with success")
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.listen(4000, () =>{
    console.log("Customer Server start");
})