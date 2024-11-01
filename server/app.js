const express = require("express");
const cors = require("cors");
const noteRouter = require("./router/noteRouter");
const userRouter = require("./router/userRouter");
const error = require("./middelware/errorHandler");
const session = require("./middelware/sessionConfig");
const {auth} = require("./middelware/decodedJWT");

// const https = require("https");
// const fs = require("fs");

// const privateKey = fs.readFileSync("./private.key");
// const certificate = fs.readFileSync("./certificate.crt");
const app = express();

app.use(cors());
app.use(express.json());
app.use(session)
app.use(error.jsonParseErrorHandler);

app.use("/users", userRouter);
app.use("/notes", auth, noteRouter);

// const httpsServer = https.createServer({
//     key: privateKey,
//     cert: certificate
// }, app);

app.get('/', (req, res) => {
    res.send("funca");
})

const config = {
    port: process.env.EXPRESS_PORT,
    host: process.env.EXPRESS_HOST
}

const port = 5000;
app.listen(config, () => {
    console.log(`Servidor HTTP esta en el puerto http://${config.host}:${config.port}`);
})