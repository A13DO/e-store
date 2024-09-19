
const Order = require("../models/order")


const getAllOrders = async (req, res) => {
    const orders = await Order.find({})
    res.status(200).json({orders: orders})
}
const getOneOrder = async (req, res) => {
    const {id} = req.params
    const order = await Order.find({_id: id})
    res.status(200).json({order: order})
}

const createOrder = async (req, res) => {
    const order = await Order.create(req.body)
    res.status(201).json({order: order})
}
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id)
    res.status(200).json({success: true, msg: `(${order.userInfo.name})'s order Deleted!`})
}


module.exports = {getAllOrders, getOneOrder, createOrder, deleteOrder}