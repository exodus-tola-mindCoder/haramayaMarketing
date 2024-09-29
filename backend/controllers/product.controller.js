import mongoose from "mongoose"; // to communicate with the db
import Products from "../models/product.model.js"; // imported from product model or schema
export const getProducts = async(req, res)=> {
  try {
    const products = await Products.find();
    if(products.length === 0) {
      return res.status(404).json({success:false, message:"No products found"});
    }
    res.status(200).json({success:true, data: products});
  } catch (error) {
    console.error("error in get products", error.message);
    res.status(500).json({success:false, message:"Internal Server Error"});
  }
};
export const createProduct = async (req, res) => {
  const product = req.body;
  if(!product.name||!product.price||!product.image) {
    return res.status(400).json({ message: "Please provide all fields" });
  }
  const newProduct = new Products(product);

  try {
    await newProduct.save();
    res.status(201).json({success: true, data: newProduct})
  } catch (error) {
    console.error("error in Create product", error.message);
    res.status(500).json({success:false, message: "Server error"});
  }
};
export const  updateProduct = async(req, res) => {
  const {id} = req.params;
  const product = req.body;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({success:false, message: "invalid product id"});
  }
  
  try {
    const updatedProduct = await Products.findByIdAndUpdate(id, product, {new:true});
    if(!updatedProduct) {
      return res.status(404).json({success:false, message: "product not found"});
    }
    res.status(200).json({success:true, data: updatedProduct});
  } catch (error) {
    console.error("error in update products", error.message);
    res.status(500).json({success:false, message: "Server error"});
  }
};
export const deleteProducts = async (req, res)=> {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({success:false, message: "invalid product id"});
  }
  
  try {
    await Products.findByIdAndDelete(id);
    res.status(200).json({success: true, message: "successfully deleted"});
  } catch (error) {
    res.status(500).json({success:false, message: "Server Error"})
  }
}
