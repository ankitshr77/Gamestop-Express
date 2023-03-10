const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name:{
            type: String,
            require:[true, "Please Enter Product Name"]
        },
        
        price:{
            type: Number,
            require:[true, "Please Enter Product Price"]

        },

        image:{
            type: String,
            require:true
        }
    },
    {timestamps: true}
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;