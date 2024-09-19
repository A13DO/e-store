const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please enter valid title"],
    },
    price:  {
        type: Number,
        required: [true, "please enter valid price"],
        min: 0
    },
    description:  {
        type: String,
        required: [true, "please enter valid description"],
    },
    rating: {
        type: Number,
        required: [true, "please enter valid rating"],
        min: 0,
        max: 5
    },
    category: {
        type: String,
        required: [true, "please enter valid category"],
        default: "others"
    },
    images: {
        type: [String], // Array of strings
        validate: {
            validator: function (arr){
                return arr.length > 0; // At least on image
        },
        message: 'At least one image URL is required'
    }
    },
    stockQuantity: {
        type: Number,
        required: [true, "please enter valid quantity"],
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("Product", ProductSchema);