const Sequelize = require('sequelize');

const sequelize = new Sequelize('masjidlocal', 'postgres', 'masjidlocal',{
    dialect: 'postgres',
    host: 'localhost' });

module.exports = sequelize;

// const { Pool } = require('pg');

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'masjidlocal',
//     password: 'masjidlocal',
//     port: 5432,
// });

// // pool.on('error', (err, client) => {
// //     console.error('Error:', err);
// // });

// module.exports = pool;


