const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/recipeapp");

const recipeSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    ingredients: String,
    prep: Number,
    steps: String,
    cook: Number
})

module.exports = mongoose.model('user', recipeSchema);