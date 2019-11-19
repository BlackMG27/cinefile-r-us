//set up the variables
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const app = express();
const passport = require('passport');
const users = require("./routes/api/users");
const movie = require("./routes/api/movie");
//get our models
const db = require('./models');

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

//Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);
//routes
app.use('/api/users', users);
app.use("/api/movie", movie)
    // Start the API server
db
    .sequelize
    .sync()
    .then(function() {
        app
            .listen(PORT, function() {
                console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
            });
    })