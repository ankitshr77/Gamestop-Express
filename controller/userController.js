const User = require('../models/userModel')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "helloankit$$"

// REGISTER NEW USER

exports.addUser = async(req,res)=>{
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    try {
        const newuser = await User({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: secPass
        });
        let user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(505).json({error:"Email already exists."})
        }
        else{
            user = await newuser.save()
            const data = {
                user:{
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);

            res.json({authToken})

        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
}

// FETCHING ALL THE USERS

exports.allUsers = async(req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users) 
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
}

// FETCHING SPECIFIC USER

exports.userDetail = async(req,res) =>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
        res.status(400).json("User not found.")
    }
    res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
    
}

// EDITING SPECIFIC USER

exports.editUser = async(req,res) =>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if(!user){
            res.status(400).json("User not found")
        }
        const updatedUser = await User.findByIdAndUpdate(id)
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
    
}

// DELETING SPECIFIC USER

exports.deleteUser = async(req,res) =>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            res.status(400).json("User not found")
        }
        res.status(200).json("User Deleted Successfully.") 
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
    
}

// FOR LOGIN USER 

exports.loginUser = async(req,res)=>{

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            res.status(500).json({message:"Please enter correct credentials."})
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            res.status(500).json({message:"Please enter correct credentials."})
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({authToken})


    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
    }


// GET LOGGED IN USER DATA
exports.getLogUser = async(req,res) =>{
    try {
        const userId = req.user.id; // from middleware fetchuser
        const user = await User.findById(userId).select("-password"); 
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
}