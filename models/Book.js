const mongoose = require("../config/db")

const BookSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
  });
  
  module.exports= mongoose.model('Book', BookSchema, "books"); //MODEL

