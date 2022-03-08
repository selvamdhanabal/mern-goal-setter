const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../modals/userModal')
const res = require('express/lib/response')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get toker from header
            token = req.headers.authorization.split(' ')[1];
    
            // Verify toker
            const decode = jwt.verify(token, process.env.JWT_SCERET);
    
            // Get user from token
            req.user = await User.findById(decode.id).select('-password')
    
            next()
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized')
        }
    }
    if(!token) {
        res.status(401);
        throw new Error('Not authorized, no token')
    }
}) 

module.exports = {protect}