const mongoose = require("mongoose")


const OrderSchema = new mongoose.Schema({
    userInfo: {
        name: {
            type: String,
            required: [true, "please enter valid name"],
        },
        email: {
            type: String,
            required: [true, "please enter valid email"],
        },
        contactNumber: {
            type: Number,
            required: [true, "please enter valid contactNumber"],
        },
        totalCost: {
            type: Number,
            required: [true, "please enter valid totalCost"],
        }
    },
    products: [{
        name: {
            type: String,
            required: [true, "please enter valid product name"],

        },
        quantity: {
            type: Number,
            required: [true, "please enter valid quantity"],
            min: 1
        },
        price: {
            type: Number,
            required: [true, "please enter valid price"],
        },
    }], 
    createdAt: {
        type: Date,
        default: Date.now
    }
},{collection: "orders"})


module.exports = mongoose.model("Order", OrderSchema);