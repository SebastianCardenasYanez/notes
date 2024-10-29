const SemVer = require("semver");

module.exports = (version) => {
    return function (req, res, next) {
        if(req.headers["x-version"]){
            if (SemVer.eq(req.headers["x-version"], version)) {
            return next();
            }
            return next('route');
        }else{
            return next('route');
        }
    };
};

// ciclo realTime metodo ref
// tienda de datos 