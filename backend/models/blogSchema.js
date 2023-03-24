const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title :{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("Blog",blogSchema);