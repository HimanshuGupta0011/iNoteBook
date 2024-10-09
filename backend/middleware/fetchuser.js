const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodboy';

const fetchUser = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({ error: "Please authenticate using a valid token!"});
    };
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some Internal Error occurred");
    }
};

module.exports = fetchUser;