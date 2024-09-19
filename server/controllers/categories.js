
const Category = require("../models/categories")


const getAllCategories = async (req, res) => {
    const categories = await Category.find({}).select("category  -_id")
    res.status(200).json({categories: categories})
}

const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body)
        res.status(201).json({Category: category})
        
    } catch (error) {
        if (error.code === 11000) {
            res.status(403).json({msg: "This category already exists."})
        } else {
            res.status(500).json({msg: error.message})
        }
    }
}
// const deleteCategory = async (req, res) => {
//     const { id } = req.params;
//     const Category = await Category.findByIdAndDelete(id)
//     res.status(200).json({success: true, msg: `(${Category.userInfo.name})'s Category Deleted!`})
// }


module.exports = {getAllCategories, createCategory}