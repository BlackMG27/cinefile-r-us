//set up the variables
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Start the API server
app
    .listen(PORT, function() {
        console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    });