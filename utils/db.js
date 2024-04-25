const mongoose = require('mongoose');
const MONGO_URL = "mongodb+srv://a130nishikamehta:dybala21@cluster0.d933yfa.mongodb.net/"

// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

module.exports = mongoose;
