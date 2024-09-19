const mongoose = require('mongoose');

const userListsSchema  = new mongoose.Schema({
  _id: {
    type: String,  // Use String type for _id since uid is a string
    unique: true,  // Ensures that each uid is unique
    required: true
  },
  cart: [{
    product: {
       type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'  // Assuming you have a Product model
    },
    quantity: {
       type: Number,
       required: true,
      min: 1  // Ensures quantity is at least 1
    }
  }],
  wishlist: [{
    product: {
       type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'  // Assuming you have a Product model
    },
    quantity: {
       type: Number,
      default: 1  // Default quantity if needed; remove if not required
    }
  }]
});


module.exports = mongoose.model('UserLists', userListsSchema );


// Example ObjectId values for the products (replace with actual values from your database)
// const productId1 = '64f7c7e8f4b2b3d0c1e2f5b1';  // ObjectId for Laptop
// const productId2 = '64f7c7e8f4b2b3d0c1e2f5b2';  // ObjectId for Headphones

// const newUserLists = new UserLists({
//   _id: 'user123',  // This is the uid and also the document's _id
//   cart: [
//     {
//       product: productId1,
//       quantity: 1
//     },
//     {
//       product: productId2,
//       quantity: 2
//     }
//   ],
//   wishlist: [
//     {
//       product: productId1,
//       quantity: 1
//     }
//   ]
// });