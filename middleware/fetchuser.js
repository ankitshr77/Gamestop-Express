var jwt = require('jsonwebtoken');

const JWT_SECRET = "helloankit$$"

const fetchuser = async(req,res,next) =>{
    // Get the user from the token
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({message:"Access Denied, Invalid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        // if token matched, we get user
        req.user = data.user;
        next();  
    } catch (error) {
        res.status(401).json({message:"Access Denied, Invalid token"})
    }
    

}

module.exports = fetchuser