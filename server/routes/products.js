const express = require("express")
const router = express.Router()
const { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/products")
const upload = require("../middleware/upload")


router.route("/")
    .get(getAllProducts)
    .post(upload.array("uploads"), createProduct)
router.route("/:id")
    .get(getOneProduct)
    .patch(upload.array("uploads"), updateProduct)
    .delete(deleteProduct)

module.exports = router