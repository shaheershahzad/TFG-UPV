const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const newsletterSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
},
{
    timestamps: true
});

const newsletterModel = mongoose.model("Newsletter", newsletterSchema);
module.exports = newsletterModel;