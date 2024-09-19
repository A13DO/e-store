const express = require("express");
const router = express.Router();
const {getAllComments, getOneComment, createComment, putComment} = require("../controllers/comment")

router.route("/:productID")
    .get(getAllComments)
    .post(createComment)

router.route("/:productID/:uid")
    .get(getOneComment)
    .put(putComment)

module.exports = router
