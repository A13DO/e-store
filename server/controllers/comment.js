
const Comments = require("../models/comment")


const getAllComments = async (req, res) => {
    const { productID } = req.params;
    const comments = await Comments.find({productID: productID})
    res.status(200).json({comments: comments})
}
const getOneComment = async (req, res) => {
try {
    const { productID, uid} = req.params
    const comments = await Comments.aggregate([
        { $match: { productID: productID } },
        { $project: {
            _id: 0,  // Exclude _id if not needed
            [`${uid}`]: { $ifNull: [`$comments.${uid}`, null] }
        } }
    ])
    if (!comments) {
        res.status(500).json("server error")
    } 
    res.status(200).json(comments[0])
    // res.status(200).json({comment: comments, msg: {productID: productID, [`comments.${uid}.uid`]: uid }})
} catch (error) {
    res.status(500).json({msg: error})
}
}

// const createComment = async (req, res) => {
//     const comment = await Comment.create(req.body)
//     res.status(201).json({comment: comment})
// }
const createComment = async (req, res) => {
    const { productID } = req.params;
    const { uid, username, comment, rating } = req.body;

    try {
        // Find the existing comments document for the product
        let productComments = await Comments.findOne({ productID });

        // If it doesn't exist, create a new document
        if (!productComments) {
            productComments = new Comments({ productID, comments: {} });
        }

        // Check if the comment by the same UID already exists
        if (productComments.comments.has(uid)) {
            return res.status(400).json({ message: 'Comment already exists for this user' });
        }

        // Add the new comment
        productComments.comments.set(uid, { uid, username, comment, rating });
        await productComments.save();

        res.status(201).json(productComments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const putComment = async (req, res) => {
    const { productID, uid } = req.params;
    const { username, comment, rating } = req.body;

    try {
        // Find and update the existing comments document for the product
        const updatedProductComments = await Comments.findOneAndUpdate(
            { productID },
            { $set: { [`comments.${uid}`]: { uid, username, comment, rating } } },
            { new: true, upsert: true }
        );

        res.status(200).json(updatedProductComments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// const deleteComment = async (req, res) => {
//     const { id } = req.params;
//     const comment = await Comment.findByIdAndDelete(id)
//     res.status(200).json({success: true, msg: `(${comment})'s comment Deleted!`})
// }


module.exports = {getAllComments, getOneComment, createComment, putComment}