const jwt = require("jsonwebtoken");
const JWT_SECRET = "goodboy";

const fetchuser=(req,res,next)=>{

    // Get User from the JWT_TOKEN and add the id to requested object
    const token=req.header('auth-token');
    if (!token) {
        res.status(401).send({error:'Please authenticate using valid token'})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:'Please authenticate using valid token'})

    }


}

module.exports=fetchuser