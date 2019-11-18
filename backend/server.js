var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

var Users = require('./routes/Users');
app.use('/users', Users),

    app.listen(port, () => {
        console.log(`Server is runing on port ${port}`);
    })