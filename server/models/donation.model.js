const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const donationSchema = new Schema({
    donerId: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    projectId: {
        type: String,
        trim: true,
        default: "General"
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true
    },
    paymentDate: {
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true
});

const donationModel = mongoose.model("Donations", donationSchema);
module.exports = donationModel;