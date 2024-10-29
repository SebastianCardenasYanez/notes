const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const User = require("../model/userModel");

/**
 * @method addNewUser Crear Usuario 
 * @description Crea un nuevo usuario 
 * TODO: devuelve un token JWT
 */
exports.addNewUser = async(req, res) =>{
    try {
        let user = new User();
        req.body.password = await bcrypt.hash(req.body.password, 10);
        let resultPost = await user.save(req.body);
        if(resultPost.status !== 201) return res.status(resultPost.status).json(resultPost);
        delete req.body.password;
        console.log("resultado del post", resultPost);
        req.body.id = resultPost.data.insertedId;
        const SECRET_KEY = fs.readFileSync('./certificate.csr');
        const token = jwt.sign(req.body, SECRET_KEY.toString('utf8'), {expiresIn: 1800000});
        req.session.auth = token;
        return res.status(202).json({status: 202, message: "User created and logged in"})
    } catch (error) {
        let err = JSON.parse(error.message);
        return res.status(err.status).send(err);
    }
}


// {
//     "_id": {
//       "$oid": "6718dd9a51d1d0d3a4fa040a"
//     },
//     "nickname": "juancho_insanidi",
//     "email": "exampleEmail@gmail.com",
//     "name": "juan",
//     "passsword": "$2a$10$StWvtNr744/06EKB2cQWzu1p0wSuVRwMb4FNuur1OQqa0yBEJEjF."
//   }


/**
 * @method signInUser Inicia sesion de usuario
 * @description Permite a un usuario iniciar sesion
 * TODO: obtener un token JWT
 */
exports.signInUser = async(req, res) =>{
    try {
        let users = new User();
        const { email, password } = req.body;
        const user = await users.signIn(email);
        if (!user) return res.status(404).json({ status: 404, message: "User not found" });
        const isMatch = await bcrypt.compare(password, user.data.password);
        if (!isMatch) return res.status(401).json({ status: 401, message: "Incorrect password" });
        const SECRET_KEY = fs.readFileSync('./certificate.csr');
        const token = jwt.sign({ id: user.data._id, email: user.data.email }, SECRET_KEY.toString('utf8'), { expiresIn: 1800000 });
        req.session.auth = token;
        console.log(token);
        console.log("==>",req.session.auth);        
        return res.status(200).json({ status: 200, message: "Login successful", token });
    } catch (error) {
        let err = JSON.parse(error.message);
        return res.status(err.status).send(err);
    }
}

/**
 * @method logOutUser Cierra sesion de usuario
 * @description Permite a un usuario cerrar sesion
 * TODO: opcional
 */
exports.logOutUser = async(req, res) =>{
    try {

    } catch (error) {
        let err = JSON.parse(error.message);
        return res.status(err.status).send(err);
    }
}

/**
 * @method updateUserById Actualizar usuario
 * @description Actualiza la informacion de usuario
 * TODO: opcional
 */
exports.updateUserById = async(req, res) =>{
    try {

    } catch (error) {
        let err = JSON.parse(error.message);
        return res.status(err.status).send(err);
    }
}

/**
 * @method deleteUserById Eliminnar usuario
 * @description Elimina la informacion de usuario
 * TODO: opcional
 */
exports.deleteUserById = async(req, res) =>{
    try {

    } catch (error) {
        let err = JSON.parse(error.message);
        return res.status(err.status).send(err);
    }
}