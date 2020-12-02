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

// Makes sure Express behaves correctly in production environment
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets like main.js or main.css
  app.use(express.static("client/build"));

  // Express will serve up the index.html file if it doesn't recognize the route
  const path = require("path");
  // If we have nothing inside authroutes, billingRoutes, and client/build
  // we will give you back the index.html file
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", index.html));
  });
}

// Listening for incoming traffic at port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
