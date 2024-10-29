const { ObjectId } = require("mongodb");
const ConnectMongodb = require("../db/db");

module.exports = class History extends ConnectMongodb {
    constructor() {
        super();
    }
    async updateHistorybyNoteId({id, user_id, body}){
        try {
            let data  = {
                title: body.title,
                description: body.description,
                user_id: new ObjectId(user_id),
                modified_at: new Date(),
                note_id: new ObjectId(id)
            }
            const { status, message, data: db} = await this.getConnect();
            const collection = db.collection("history");
            const result = await collection.insertOne(data);
            return { status: 201, message: "History note updated", data: result }
        }catch (error){
            throw new Error(JSON.stringify({status: 500, message: "Error updating the note", data: error}))
        }
    }
    async getHistoryByNoteId(id) {
        try {
            const { status, message, data: db} = await this.getConnect();
            console.log(new ObjectId(id));
            const collection = db.collection("history");
            const result = await collection.find({_id: new ObjectId(id)}).toArray();
            return { status: 200, message: "History getted", data: result }
        }catch (error){
            throw new Error(JSON.stringify({status: 500, message: "Error getting the history", data: error}))
        }
    }
}