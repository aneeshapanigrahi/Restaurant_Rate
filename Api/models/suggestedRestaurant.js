const mongoose = require("mongoose");

const SuggestedRSchema = new mongoose.Schema({
    pics: [],
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    timings: {
        type: String
    },
    address: {
        type: String
    },
    contactNo: {
        type: String
    },
    website: {
        type: String
    },
    comments: [],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("SuggestedR", SuggestedRSchema);