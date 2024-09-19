const express = require("express");
const router = express.Router();

const {getAllCategories, createCategory} = require("../controllers/categories");





router.route("/")
    .get(getAllCategories)
    .post(createCategory)

// router.route("/:id")
//     .get(getOneOrder)
//     .delete(deleteOrder)

module.exports = router