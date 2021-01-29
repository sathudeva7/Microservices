const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/library-order', {useNewUrlParser: true}, () => {
    console.log("mongoose connected")
})
require("./OrderModel");
const Order = mongoose.model("Order")

app.get('/order',(req,res) => {
    Order.find().then((order) => {
        res.json(order)
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.get('/order/:id',(req,res) => {
    Order.findById(req.params.id).then((order) => {
        if(order){
            axios.get("http://localhost:4000/customer/"+order.CustomerID).then((out) => {
                var orderObject = {customerName:out.data.name,bookTitle:''}
                
                axios.get("http://localhost:3000/book/"+order.BookID).then((out2) => {
                    orderObject.bookTitle = out2.data.title
                    res.json(orderObject)
                })

            })
           
        }else{
            res.json("no order")
        }
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.post('/order',(req,res) => {
    var newOrder = {
        CustomerID:mongoose.Types.ObjectId(req.body.CustomerID),
        BookID:mongoose.Types.ObjectId(req.body.BookID),
        initialDate:req.body.initialDate,
        deliveryDate:req.body.deliveryDate
    }

    var order = new Order(newOrder)

    order.save().then((order) => {
        res.json(order)
    }).catch((err) => {
        if(err){
            throw err;
        }
    }) 
})

app.delete('/order/:id',(req,res) => {
    Order.findOneAndRemove(req.params.id).then(() => {
        res.send("Order removed with success!")
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})


app.listen(5000, () =>{
    console.log("Order Server start");
})