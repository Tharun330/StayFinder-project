const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

userSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("User", userSchema)