const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Question = new Schema({
    title: String,
    rows: [{
        id: Number,
        text: String,
        image: String,
        radioOption: String
    }],
    columns: [{
        id: Number,
        text: String,
        image: String,
    }],

});

module.exports = mongoose.model('Question', Question);