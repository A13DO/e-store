const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Please enter valid category."],
        unique: [true, "This category already exists."], // Ensures the category value is unique
        trim: true // Removes any leading or trailing spaces
    },
},{collection: "categories"})

module.exports = mongoose.model("Category", CategorySchema);
