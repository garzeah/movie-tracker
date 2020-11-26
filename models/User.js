const mongoose = require("mongoose");
const { Schema } = mongoose;

// A blueprint of what each record looks like
const userSchema = new Schema({
  googleID: String,
});

// Creating a new collection called users
mongoose.model("users", userSchema);
