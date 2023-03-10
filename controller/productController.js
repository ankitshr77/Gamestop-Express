const Product = require('../models/productModel')

// ADD NEW PRODUCT

exports.addProduct = async(req,res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product)
    } catch (error) {
        console.log(err);
        res.status(500).json({message:err.message});
    }
}

// FETCHING SPECIFIC PRODUCT

exports.productDetail = async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product){
            res.status(400).json("Product Not Found")
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
}

// FETCHING ALL THE PRODUCTS
exports.allProducts = async(req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json(products)
    } catch (error) {
        console.log(err)
        res.status(500).json({message: err.message})   
    }
}

// DELETING THE PRODUCT
exports.deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json("Product not found")
        }
        res.status(200).json("Product Deleted Successfully.")
        
        
    } catch (error) {
        console.log(err)
        res.status(500).json({message: err.message})
    }
}

// UPDATING THE PRODUCT

exports.editProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            res.status(400).json("Product you want to edit cannot be found")
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
    } catch (error) {
        console.log(err)
        res.status(500).json({message: err.message})
    }
}