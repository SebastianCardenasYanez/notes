const { MongoClient } = require("mongodb");

module.exports = class ConnectMongodb {
    constructor() {
        this.url = process.env.MONGO_URL;
        this.dbName = process.env.MONGO_DB_NAME;
    }
    async getConnect(){
        try {
            const client = await MongoClient.connect(this.url);
            const db = client.db(this.dbName);
            return {
                status: 200,
                message : "Connection established",
                data : db
            }
        } catch(error){
            console.log(error);
            throw new Error(JSON.stringify({ status: 500, message: "connection error", data:error }));
        }
    }
}
// mongodb://root:campus2023@172.16.102.68:27017/