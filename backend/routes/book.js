const express = require('express');

const router = express.Router();
const Book = require('../Models/Book');
const User = require('../Models/User');

router.get('/', (req, res) => {
    res.send('We are live!');
});

// COMMON
router.get("/get_all", async(req, res, next) => {
  try {
    const all_books = await Book.find({});
    console.log(`Sending ${all_books.length} books!`);
    res.status(200).send(all_books);
  }
  catch (error) {
    next(error);
  }
});

// ADMIN
router.post("/add", async (req, res, next) => {
  try {
    if(typeof(req.body.title) === 'undefined') {
      res.status(400).send("Title is required");
    }
    if(typeof(req.body.author) === 'undefined') {
        res.status(400).send("Author is required");
    }
    if(typeof(req.body.year) === 'undefined') {
        res.status(400).send("Year is required");
    }
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
      copies: (req.body.copies === null ? 1 : req.body.copies),
    });
    console.log(req.body);
    book.save().then(() => console.log('Saved!'));
    res.status(200).send("Added");
  } 
  catch (err) {
    next(err);
  }
});

router.delete("/delete", async(req, res, next) => {
  try {
    const book_id = req.body.id;
    const del = await Book.deleteOne({ _id : book_id });
    console.log(`Deleted ${book_id}`);
    res.status(200).send('Book Deleted!');
  }
  catch (error) {
    next(error);
  }
});

router.put("/change_copies", async (req, res, next) => {
  try {
    const book_id = req.body.id;
    const new_copies = req.body.copies;
    const book = await Book.findOne({ _id : book_id });
    book.copies = new_copies;
    book.save().then(console.log('Copies Updated!'));
    res.status(200).send(book);
  }
  catch (error) {
    next(error);
  }
});

// ISSUE A BOOK
router.put("/issue", async (req, res, next) => {
  try {
    const book_id = req.body.id;
    const book = await Book.findOne({ _id : book_id });
    if(book.copies > 0){
      book.copies -= 1;
      book.borrowed += 1;
      book.save();
      const user = await User.findOne({ _id : req.body.userID });
      user.books.push(book_id);
      user.save();
      res.status(200).send("Book Issued Succesfully!");
    }
    else{
      res.status(400).send("Not Enough Copies Available!");
    }
  }
  catch (error) {
    next(error);
  }
});

// RETURN A BOOK
router.put("/return", async (req, res, next) => {
  try {
    const book_id = req.body.id;
    const book = await Book.findOne({ _id : book_id });
    const user = await User.findOne({ _id : req.body.userID });
    
    const idx = user.books.indexOf(book_id);
    if(idx > -1){
      user.books.splice(idx, 1);
      user.save();
      book.copies += 1;
      book.save();
      res.status(200).send("Book Returned Succesfully!");
    }
    else{
      res.status(400).send("Book Not Issued!");
    }
  }
  catch (error) {
    next(error);
  }
});

// SEARCH API'S
router.post("/find_by_title", async (req, res, next) => {
  try {
    const txt = req.body.title;
    console.log(req.body);
    const book = await Book.findOne({ title : txt });
    if(book) {
      console.log("Book found!");
      res.status(200).send(book);
    }
    else{
      res.status(404).send("Book Not Found!");
    }
  }
  catch (error) {
    next(error);
  }
});

router.post("/find_by_author", async (req, res, next) => {
  try {
    const txt = req.body.author;
    const book = await Book.findOne({ author : txt });
    if(book) {
      console.log("Book found!");
      res.status(200).send(book);
    }
    else{
      res.status(404).send("Book Not Found!");
    }
  }
  catch (error) {
    next(error);
  }
});

router.post("/find_by_year", async (req, res, next) => {
  try {
    const txt = req.body.year;
    const book = await Book.find({ year : txt });
    if(book) {
      console.log("Book(s) found!");
      res.status(200).send(book);
    }
    else{
      res.status(404).send("Book Not Found!");
    }
  }
  catch (error) {
    next(error);
  }
});

// RETURN THE LIST OF BOOKS THAT THE USER HAS ISSUED
router.post("/get_issued", async (req, res, next) => {
  try {
    console.log(req.body);
    const book_ids = req.body.books;
    const books = await Book.find({ _id : book_ids });
    if(books) {
      console.log(`Sending ${books.length} books!`);
      res.status(200).send(books);
    }
    else {
      res.status(404).send("No books issued so far!");
    }
  }
  catch (error) {
    next(error);
  }
});

module.exports = router;