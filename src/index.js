const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://users-open-to-all:hiPassword123@cluster0.uh35t.mongodb.net/Rahul(WISHUP)?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log('MongoDB up and running, please proceed and hit an API'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});