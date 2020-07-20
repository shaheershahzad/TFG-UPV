const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        default: "registered",
        trim: true
    },
    birthday: {
        type: String,
        required: true,
        trim: true
    },
    newsletter: {
        type: Boolean,
        required: true,
        default: false,
        trim: true
    }
},
{
    timestamps: true
});

module.exports = userSchema;