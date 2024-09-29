import mongoose from "mongoose";
// create a product schema
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  price: {
    type:Number,
    required:true
  },
  image: {
    type:String,
    required: true
  }, 
}, {
  timestamps: true // createdAT and updatedAT

});

const Products = mongoose.model("Product", productSchema);
export default Products;
