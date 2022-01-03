const mongodb = require('mongodb');
const mongoClinet = mongodb.MongoClient;

let _db;


const mongoConnect = (callback) => {
    mongoClinet.connect('mongodb+srv://tarikul13:mongotarikul13@cluster0.llyo3.mongodb.net/MasjidTimeDB?retryWrites=true&w=majority')
    .then(client => {
        _db = client.db();
        console.log('Connected');
        callback()
    })
    .catch(err => {
    console.log(err);
    throw err
    });
};

const getDb = () => {
    if (_db){
        return _db;
    }
    throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;