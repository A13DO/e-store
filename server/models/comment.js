const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    }
});

const CommentsSchema = new mongoose.Schema({
    productID: {
        type: String,
        required: true,
    },
    comments: {
        type: Map,
        comments: [CommentSchema]
    }
}, { collection: "commentsDatabase" });

module.exports = mongoose.model("Comments", CommentsSchema);
