const passport = require("passport");

module.exports = (app) => {
  // Telling Passport to authenticate the user coming to this route
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      // Asking Google to give access to this information
      scope: ["profile", "email"],
    })
  );

  // Sending request back to google with our code included
  // Passport will see the code in our url and passport will handle it
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    // Redirect the user back to Home page
    (req, res) => {
      res.redirect("/");
    }
  );

  // logs the user out
  app.get("/api/logout", (req, res) => {
    // takes the cookie and kills the ID in there
    req.logout();
    res.redirect("/");
  });

  // checking to see if our authentication works
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
