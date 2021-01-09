const jwt = require('jsonwebtoken'); 

const auth = (req, res, next) => { 
    try{ 
        //checks if the user has the token, if not then doesn't let them delete 
        const token = req.header("x-auth-token"); 
        if(!token){ 
            return res.status(401).json({message: "No authentication token, authorization denied."}); 
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET); 
        if(!verified){ 
            return res.status(401).json({message: "Token varification failed, authorization denied."}); 
        }
        req.user = verified.id; 
        next(); 
    }catch(err){ 
        res.status(500).json({error: err. message}); 
    }
}

module.exports = auth; 