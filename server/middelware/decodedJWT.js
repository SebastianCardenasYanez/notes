const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.auth = (req, res, next) => {
    try {
        const SECRET_KEY = fs.readFileSync('./certificate.csr');
        // console.log("==>",req.session.auth);
        
        // var payload = jwt.verify(req.session.auth, SECRET_KEY.toString('utf8'));
        // console.log(payload);
        
        // req.data = payload;
        next();
    } catch (error) {
        return res.status(401).json({status: 401, message: "Unauthorized"});
    }
}