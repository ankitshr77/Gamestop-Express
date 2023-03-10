const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    
        fname:{
            type: String,
            required: [true, "Please Enter Your First Name"]
        },
        lname:{
            type: String,
            required: [true, "Please Enter Your Last Name"]
        },
        email:{
            type: String,
            required: [true, "Please Enter Your Email Address"]
        },
        password:{
            type: String,
            required: [true, "Please Enter Your Password"]
        }
    }, {timestamps: true}
)

const User = mongoose.model("User", userSchema)

module.exports = User