const UserLists = require("../models/user-lists")


const getAllCart = async (req, res) => {
    const lists = await UserLists.find({})
    res.status(200).json({UserLists: lists})
}

const addToCart= async (req, res) => {
    try {
        const lists = await UserLists.create(req.body)
        res.status(201).json({UserLists: lists})
        
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


module.exports = {getAllCart, addToCart}