const express = require("express")
const router = express.Router()
const { getAllCart, addToCart, createProduct, updateProduct, deleteProduct } = require("../controllers/user-lists")
const upload = require("../middleware/upload")


router.route("/:userId")
router.route("/:userId/cart")
    .get(getAllCart)
router.route("/:userId/wishlist")
router.route("/:userId/cart/:productId")
router.route("/:userId/wishlist/:productId")


module.exports = router