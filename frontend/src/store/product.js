import {create} from "zustand";
// import { useState } from "react";
export const useProductStore = create((set) => ({
  products: [],
  setProduct: (products) => set({products}),
  createProduct: async(newProduct)=> {
    if(!newProduct.name || !newProduct.price || !newProduct.image) {
      return {success: false, message: "Please fll in all fields!."}
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(newProduct)
    })
    const data = await res.json();
    if(!data.success) {
      console.log("Error Creating product:", data.message)
      return {success: false, message: data.message}
    }
    set((state) => ({products:[...state.products, data.data ]}));
    return {success:true, message:"Product Created successfully"}
  },
  // fetching products
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({products:data.data});
  },

  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    })
    const data = await res.json();
    if(!data.success) return {success: false, message: data.message}
    // update the ui immediately without needing a refresh
    set(state => ({products: state.products.filter((product) => product._id !== pid) }));
    return {success: true, message: data.message}
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedProduct),
    })
    const data = await res.json();
    if(!data.success) return {success: false, message: data.message};
    // update the ui immediately, without needing a refresh
    set((state) => ({
      products: state.products.map((product) => (product._id === pid ? { ... product, ... data.data} : product)),
    }));

    console.log('Updated product data:', data.data);

    return {success: true, message: data.message};
  },
}));

