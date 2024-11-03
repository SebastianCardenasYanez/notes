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
    async updateHistoryNoteById (body, id) {
        try {
            const data = {
                title : body.title,
                content : body.content,
                date : new Date()
            }
            console.log("mi mamma la gata",data, body);
            const { status, message, data: db} = await this.getConnect();
            const collection = db.collection("notes");
            const result = await collection.updateOne(
                {    
                    _id: new ObjectId(id.id),
                    user : new ObjectId(user)
                },
                {
                    $set : data,
                    $push : {
                        history : body.history
                    }
                }
            );
            console.log({status: 214, message: "Note updated", data: result});
            
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
    async saveNote(body) {
        try {
            console.log("hola",body);
            body.date = new Date();
            body.history = [];
            body.user = new ObjectId('6726ea7ba19296d0eef7c3f2');
            body.status = "visible";
            const { status, message, data: db} = await this.getConnect();
            const collection = db.collection("notes");
            const result = await collection.insertOne( body );
            return {status: 201, message: "Note saved", data: result};
        } catch (error){
            throw new Error(JSON.stringify({ status: 500, message: "Error saving the note", data: error}));
        }
    }
}