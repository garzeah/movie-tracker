// Initializing our modules and application
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
// Have to call this before passport bc passport needs
// data related to this
require("./models/User");
require("./services/passport");

// Connecting to our database
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

// Telling express to make use of cookies
app.use(
  cookieSession({
    // how long cookie can exist in browser before it expires
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days b4 it expires
    keys: [keys.cookieKey], // encrypts our cookie
  })
);

// Telling passport to make use of cookies
app.use(passport.initialize());
app.use(passport.session());

// Route Handlers
// Returns the function inside the file and runs w/ app passed in
require("./routes/authRoutes")(app);

// Listening for incoming traffic at port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
