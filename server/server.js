const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const questionRoutes = express.Router();
let Question = require('./question.model');
const PORT = 4000;

app.use(cors());
/* extend the payload size to match the mongodb file upload size limit(16MB) */
app.use(bodyParser.json({limit: '16mb', extended: true}));

mongoose.connect('mongodb://127.0.0.1:27017/questions', {
    useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

questionRoutes.route('/').get(function (req, res) {
    Question.find(function (err, questions) {
        if (err) {
            console.log(err)
        } else {
            res.json(questions)
        }
    });
});

questionRoutes.route('/save').post(function (req, res) {
    let question = new Question(req.body);
    question.save()
        .then(question => {
            res.status(200).json({
                'question:': 'question saved successfully'
            });
        })
        .catch(err => {
            res.status(400).send('saving new question failed');
        });
});


app.use('/questions', questionRoutes);

app.listen(PORT, function () {
    console.log(`Server is running on Port: ${PORT}`)
})