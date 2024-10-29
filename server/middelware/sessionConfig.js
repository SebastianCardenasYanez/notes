const session = require("express-session");
const fs = require("fs");

const SECRET_KEY = fs.readFileSync("./certificate.csr");

module.exports = session ({
    secret: SECRET_KEY.toString('utf8'),
    resave: false,
    saveUninitialized: true,
    cookie: { secure : true, maxAge : 18000000 } 
});