exports.jsonParseErrorHandler = (err, req, res, next)=>{
    if(err instanceof SyntaxError && err.status === 400 && 'body' in err){
        console.clear();
        console.log(err.message);
        return res.status(400).json({status: 400,message: 'Invalid JSON, check the format'});
    }
    next();
};