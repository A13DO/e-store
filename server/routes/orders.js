const express = require("express");
const router = express.Router();

const {getAllOrders, getOneOrder, createOrder, deleteOrder} = require("../controllers/orders");





router.route("/")
    .get(getAllOrders)
    .post(createOrder)

router.route("/:id")
    .get(getOneOrder)
    .delete(deleteOrder)

module.exports = router