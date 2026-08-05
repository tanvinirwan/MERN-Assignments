const jwt = require("jsonwebtoken") ;
const secretKey = process.env.SECRET_KEY;


const authMiddleware = (req,res,next) =>{
    const token = req.cookies.token ;
    if(!token){
        return res.status(401).send("Access denied") ;
    }


    const decoded = jwt.verify(token,secretKey) ;
    if(!decoded){
        return res.status(400).send('please login again') ;
    };
    req.user = decoded ;
    next() ;
}