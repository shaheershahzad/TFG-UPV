const mongoose = require("mongoose");
const userSchema = require("../models/user.model");

userSchema.statics = {
    create: function(data, callback){
        const user = new this(data);
        user.save(callback);
    },
    login: function(query, callback){
        this.find(query, callback);
    }
}

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;