const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async(req, res ,next) =>{
    let token;

    // Check cookies first, then check Authorization header as fallback
    token = req.cookies.jwt;
    
    if (!token && req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1]; // Extract token from "Bearer <token>"
    }

    if(token){
        try{
            console.log("Verifying token with secret:", process.env.JWT_SECRET);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select('-password');
            next();
        }catch(error){
            console.error("Token Verification Error:", error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if ( req.user && req.user.role === 'admin'){
        next();
    }else{
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };