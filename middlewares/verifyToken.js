const jwt = require("jsonwebtoken")

//verify Token 
function verifyToken(req,res,next){
    const authToken = req.headers.authorization;
    if(authToken){
        const token = authToken.split(" ")[1];
        try{
            const decodedPayload = jwt.verify(token, process.env.JwT_SECRET);
            req.user = decodedPayload;
            next();
        }catch(error){
            return res.status(401).json({message:"invalid token, access denied"})
        }
    }else{
        return res.status(401).json({message:"no token, access denied"});
    }
}

// verify tokken & admin
function verifyTokkenAndAdmin(req,res,next){
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return res.status(403).json({message: "not allowed, only admin"})
        }
    });
}

// verify tokken & Only User Himself
function verifyTokkenAndOnlyUser(req,res,next){
    verifyToken(req,res, ()=>{
        if(req.user.id === req.params.id){
            next();
        }else{
            return res.status(403).json({message: "not allowed, only user himself"})
        }
    });
}


// verify tokken & Authorization
function verifyTokkenAndAuthorization(req,res,next){
    verifyToken(req,res, ()=>{
        if(req.user.id === req.params.id || req.params.isAdmin){
            next();
        }else{
            return res.status(403).json({message: "not allowed, only user himself or admin"})
        }
    });
}

module.exports = {
    verifyToken,
    verifyTokkenAndAdmin,
    verifyTokkenAndOnlyUser,
    verifyTokkenAndAuthorization
}