// setting up mongoDB
const { MongoClient } = require("mongodb");
const uri = process.env.URI

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let _db;

// creatign export with function connectToDb and getDB in order to send this information to other folders
module.exports = {
    connectToDb: (callback) => {
        client.connect( (err, db) => {
            if(db){
                _db = db.db("test");
                console.log("connected db")

            }
            return callback(err);

        });
    },

    getDB: () => {
        return _db
    }



}
