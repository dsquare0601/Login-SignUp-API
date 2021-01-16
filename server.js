const express = require('express');
const bodyParser = require('body-parser');

//create express app
const app = express();
const PORT = 3000 || Process.ENV.PORT;

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb', extended: true }))

//configuring the database
const dbConfig = require('./config/dbConfig.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})


app.get('/', (req, res) => {
    res.send("Welcome To Test API.");
})


require('./Routes/user.routes')(app);

app.listen(PORT, () => {
    console.log("Server is listening on port : " + PORT);
});