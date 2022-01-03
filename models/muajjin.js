const Sequelize = require('sequelize');

const sequelize = require('../util/postgresdb');

const Muajjin = sequelize.define('muajjin',{
    name:   Sequelize.STRING,
    address: Sequelize.STRING,
});

module.exports = Muajjin;
// const { query } = require('express');
// const { MongoSystemError } = require('mongodb');
// const client = require('pg/lib/native/client');
// const pdb = require('../util/postgresdb');

// module.exports = class Muazzim{
//     constructor(name, age){
//         this.name = name;
//         this.age = age;
//     }

//     save(){
//         const query = 'INSERT INTO muazzim (name, values) VALUES (?,?), [this.name, this.age]'
//         return pdb.connect()
//         .then((client) => {
//             client.query(query)
//                 .then(res => {
//                     for (let row of res.rows) {
//                         console.log(row);
//                     }
//                 })
//                 .catch(err => {
//                     console.error(err);
//                 });
//         })
//         .catch(err => {
//             console.error(err);
//         });
//     }

    // static fetchAll(){
    //     const query = 'SELECT * FROM muazzim';
        
    //     return pdb.connect((err, client, done) => {
    //         if (err) throw err;
    //         client.query(query, (err, res) => {
    //             done();
    //             if (err) {
    //                 console.log(err.stack);
    //             } else {
    //                 for (let row of res.rows) {
    //                     console.log(row);
    //                 }
    //             }
    //         });
    //     })
    // }
// }