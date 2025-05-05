const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter user name"]
    },
    email: {
        type: String,
        required: true
    },
    number: {  // lowercase 'number' for consistency
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: false
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
