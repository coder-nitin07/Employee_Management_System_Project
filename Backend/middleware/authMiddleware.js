const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];

        if(!token){
            return res.status(401).json({ message: 'Token not available' });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode;

        next();
    } catch (err) {
        res.status(500).json({ message: 'Token not available', error: err.message });
    }
};

module.exports = authMiddleware;