const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const newsSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        trim: true
    }
},
{
    timestamps: true
});

const newsModel = mongoose.model("News", newsSchema);
module.exports = newsModel;