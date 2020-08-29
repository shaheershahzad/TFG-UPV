const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    coordinates: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    volunteers: [
        {
            type: String,
            trim: true
        } 
    ] 
},
{
    timestamps: true
});

const projectModel = mongoose.model("Projects", projectSchema);
module.exports = projectModel;