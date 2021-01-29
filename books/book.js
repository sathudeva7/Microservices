const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/library-book', {useNewUrlParser: true}, () => {
    console.log("mongoose connected")
})
require("./BookModel");
const Book = mongoose.model("Book")

app.get('/book',(req,res)=> {
    Book.find().then((book) => {
        res.json(book)
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.get('/book/:id',(req,res) => {
    Book.findById(req.params.id).then((book) => {
        if(book){
            res.json(book)
        }else{
            res.json("no book")
        }
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.post('/book',(req,res) => {
    var newBook = {
        title:req.body.title,
        author:req.body.author,
        numberofPages:req.body.numberofPages,
        publisher:req.body.publisher
    }

    var book = new Book(newBook)

    book.save().then((book) => {
       res.json(book)
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
   
})

app.delete('/book/:id',(req,res) => {
    Book.findOneAndRemove(req.params.id).then(() => {
        res.send("Book removed with success!")
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.listen(3000, () =>{
    console.log("Book Server start");
})