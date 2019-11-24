//set up the variables
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const app = express();
const passport = require('passport');
const apiRoutes = require('./routes');

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
app.use(apiRoutes);
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
    .catch(err => console.log("Something went wrong!"))