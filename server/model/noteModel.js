const { ObjectId } = require("mongodb");
const ConnectMongodb = require("../db/db");

module.exports = class Notes extends ConnectMongodb {
    constructor() {
        super();
    }
    async getAllNotes ({id_user}) {
        try {
            const { status, message, data: db} = await this.getConnect();
            const collection = db.collection("notes");
            const result = await collection.aggregate([
                {
                    $match : {
                        status : 'visible',
                        user : new ObjectId(id_user)
                    }
                },
                {
                    $project : {
                        _id : 0
                    }
                }
            ]).toArray();            
            return {status: 200, message: "List of notes got", data: result};
        } catch (error){
            throw new Error(JSON.stringify({ status: 500, message: "Error getting all notes", data: error}));
        }
    }
    async getOneByNoteId ({id_user, id}) {
        try {
            const { status, message, data: db} = await this.getConnect();
            const collection = db.collection("notes");
            const [result] = await collection.aggregate([
                {
                    $match : {
                        _id : new ObjectId(id),
                        status: "visible",
                        user : new ObjectId(id_user)
                    }
                },
                {
                    $project : {
                        _id : 0
                    }
                }
            ]).toArray();
            return {status: 200, message: "Note found", data: result};
        } catch (error){
            throw new Error(JSON.stringify({ status: 500, message: "Error getting the note", data: error}));
        }
    }
    async searchNoteByTitleDescription ({id_user, q}) {
        try {
            const { status, message, data: db} = await this.getConnect();
            const collection = db.collection("notes");
            const result = await collection.aggregate([
                {
                    $match : {
                        status: "visible",
                        user : new ObjectId(id_user)
                    }
                },
                {
                    $project : {
                        _id : 0
                    }
                }
            ]).toArray();

            const text = q.toLowerCase();

            const resultCoincidence = result.filter(item => 
                item.title.toLowerCase().includes(text) || 
                item.content.toLowerCase().includes(text)
            );
            return {status: 200, message: "Note obtained", data: resultCoincidence};
        } catch (error){
            throw new Error(JSON.stringify({ status: 500, message: "Error getting the note", data: error}));
        }
    }
    async updateHistoryNoteById ({id, body, id_user, history}) {
        try {
            const data = {
                title : body.title,
                content : body.content,
                date : new Date(),
            }
            const { status, message, data: db} = await this.getConnect();
            const collection = db.collection("notes");
            const result = await collection.updateOne(
                {    
                    _id: new ObjectId(id),
                    user : new ObjectId(id_user)
                },
                {
                    $set : data,
                    $push : {
                        history : new ObjectId(history)
                    }
                }
            );
            return {status: 214, message: "Note updated", data: result};
        } catch (error){
            throw new Error(JSON.stringify({ status: 500, message: "Error getting the note", data: error}));
        }
    }
    async deleteNoteById ({id_user, id}) {
        try {
            const { status, message, data: db} = await this.getConnect();
            const collection = db.collection("notes");
            console.log(id);
            const result = await collection.updateOne(
                {    
                    _id: new ObjectId(id),
                    user : new ObjectId(id_user)
                },
                {
                    $set : {
                        status: "hidden"
                    }
                }
            );
            return {status: 214, message: "Note deleted", data: result};
        } catch (error){
            throw new Error(JSON.stringify({ status: 500, message: "Error deleting the note", data: error}));
        }
    }
    async save ({ body }) {
        try {
            const { status, message, data: db} = await this.getConnect();
            const collection = db.collection("notes");
            const result = await collection.insertOne( body );
            return {status: 201, message: "Note saved", data: result};
        } catch (error){
            throw new Error(JSON.stringify({ status: 500, message: "Error saving the note", data: error}));
        }
    }
}