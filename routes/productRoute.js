
const express = require('express')
const router = express.Router()
const { addProduct, allProducts, deleteProduct, productDetail, editProduct } = require('../controller/productController')
const { productRules, validation } = require('../validation')

router.post('/addproduct', productRules, validation, addProduct)
router.get('/allproducts', allProducts)
router.delete('/deleteproduct/:id', deleteProduct)
router.get('/productdetail/:id', productDetail)
router.put('/editproduct/:id', editProduct)

module.exports = router