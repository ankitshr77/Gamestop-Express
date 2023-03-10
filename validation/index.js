const { check, validationResult } = require("express-validator");

exports.userRules = [
    check('fname', 'First name is required').notEmpty()
    .isLength({min:2}).withMessage('First Name must be atleast of 2 words'),

    check('lname', 'Last name is required').notEmpty()
    .isLength({min:2}).withMessage('Last Name must be atleast of 2 words'),

    check('email', 'email is required').notEmpty(),
    check('password', 'password is required').notEmpty()
    .isLength({min:5}).withMessage('Password must be atleast of 5 words'),
    
]

exports.productRules = [
    check('name', 'Product Name is required').notEmpty()
    .isLength({min:3}).withMessage('Product Name must be atleast of 3 words'),

    check('price', 'Product Price is required').notEmpty(),
    check('image', 'Product Image is required').notEmpty()
    
]

exports.validation = (req,res,next)=>{
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next()
    } else {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }
      
}