const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// Loading in our model class/collection
const User = mongoose.model("users");

// if we see that we have the same google profile ID as the user in our db
// we give a token to identify u as that user and set it as a cookie aka serializeUser
// in case you ask for future requests relating to ur id
passport.serializeUser((user, done) => {
  // user.id and profile.id are not the same
  // user.id is used to identify the record in the database
  // we use mongo identifier instead of google sign in case we want
  // to do different types of sign ins in the future
  done(null, user.id);
});

// whenever you send us a request, we'll take your cookie we assigned from before
// and pass it into deserializeUser to turn it into a user
// if you are the same user, we give you data related to you
passport.deserializeUser((id, done) => {
  // 1st arg is the id we want to deserialize
  User.findById(id).then((user) => {
    // pass in the user we just pulled out
    done(null, user);
  });
});

// new GoogleStrategy creates a new instance of GoogleStrategy()
// which helps us authenticate users using Google login
// Passport.use is telling passport to be aware of our strategy
passport.use(
  // Tells Passport to use this strategy when we authenticate w/ Google
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // Route user is sent to after they grant permission
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    // accessToken gives us permission to handle/modify user's data
    // refreshToken allows us to refresh the accessToken after it expires
    // profile gives information regarding the user
    async (accessToken, refreshToken, profile, done) => {
      // Checking if we have this ID already or not
      const existingUser = await User.findOne({ googleID: profile.id });
      // we already have a record with the given profile ID
      if (existingUser) {
        // 1st arg is usually error but since we handled it in else, we use null
        // 2nd arg, just says we have an existingUser, everything is good
        return done(null, existingUser);
      }
      // we don't have a user record w/ this ID, make a new record
      const user = await new User({ googleID: profile.id }).save();
      done(null, user);
    }
  )
);
