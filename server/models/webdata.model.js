const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const webdataSchema = new Schema({
    websiteTitle: {
        type: String,
        required: true,
        trim: true
    },
    websiteMetaTitle: {
        type: String,
        required: true,
        trim: true
    },
    websiteMetaDescription: {
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true
});

const webdataModel = mongoose.model("Webdata", webdataSchema);
module.exports = webdataModel;