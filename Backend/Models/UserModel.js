const mongoose = require('mongoose');

const UserModel = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    photo: {
        type: String
    }
});

module.exports = mongoose.model("UserModel", UserModel);