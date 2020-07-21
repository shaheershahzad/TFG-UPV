const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const fileSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    size: {
        type: Number,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    projectId: {
        type: String,
        required: true,
        trim: true
    },
    uploaderId: {
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true
});

const fileModel = mongoose.model("Files", fileSchema);
module.exports = fileModel;