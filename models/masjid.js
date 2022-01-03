const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const masjidSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Masjid',masjidSchema);
// const mongodb = require('mongodb');
// const getDb = require('../util/mongodb').getDb;
// const pdb = require('../util/postgresdb')

// module.exports = class Masjid {
//     constructor(name, address, id){
//         this.name = name;
//         this.address = address;
//         this._id =  id;
//     }

//     save() {
//         const db = getDb();
//         let dbOp;
//         console.log(this._id);
//         if (this._id){
//             dbOp = db
//             .collection('MasjidTimeCollection')
//             .updateOne({ _id: this._id}, { $set: this });
//         }else{
//             dbOp = db.collection('MasjidTimeCollection').insertOne(this);
//             console.log('inserted one');
//         }

//         return dbOp
//         .then(result => {
//             console.log('model');
//             console.log(result);
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }

//     static fetchAll(){
//         const db = getDb();
//         return db
//             .collection('MasjidTimeCollection')
//             .find()
//             .toArray()
//             .then(masjids => {
//                 return masjids;
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     static findById(prodId){
//         console.log(prodId);
//         const db = getDb();
//         return db
//         .collection('MasjidTimeCollection')
//         .find({_id: mongodb.ObjectId(prodId)})
//         .next()
//         .then(product => {
//             console.log(product);
//             return product;
//         })
//         .catch(err => {
//             console.log(err);
//         })

//     }

//     static deleteById(prodId){
//         const db= getDb();
//         return db
//         .collection('MasjidTimeCollection')
//         .deleteOne({_id: new mongodb.ObjectId(prodId)})
//         .then(result => {
//             console.log('deleted');
//         })
//         .catch(err=>{
//             console.log(err);
//         })
//     }
// }


