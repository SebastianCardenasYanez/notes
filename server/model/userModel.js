const { ObjectId } = require("mongodb");
const ConnectMongodb = require("../db/db");

module.exports = class User extends ConnectMongodb {
    constructor() {
        super();
    }
    async save(body){
        try {
            const { status, message, data: db} = await this.getConnect();
            const collection = db.collection("users");
            const [resultNickName] = await collection.find({nikname: body.nickname}).toArray();
            if (resultNickName) return { status: 200, message: "The nickname is not avialable", data: undefined }
            const [resultEmail] = await collection.find({email: body.email}).toArray();
            if (resultEmail) return { status: 200, message: "The email is not avialable", data: undefined}
            const result = await collection.insertOne(body)
            return { status: 201, message: "Account created", data: result }
        }catch (error){
            throw new Error(JSON.stringify({status: 500, message: "Error inserting the user", data: error}))
        }
    }
    async signIn(email) {
        try {
            const { status, message, data: db } = await this.getConnect();
            const collection = db.collection("users");
            const [result] = await collection.find({ email: email }).toArray();
            if (!result) return { status: 404, message: "The email is not exist", data: undefined }
            return { status: 200, message: "Email exist", data: result }
        }catch (error){
            throw new Error(JSON.stringify({status: 500, message: "Error fetching email", data: error}))
        }
    }
}