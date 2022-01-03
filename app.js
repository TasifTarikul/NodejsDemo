const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sequelize = require('./util/postgresdb');

// const mongoConnect = require('./util/mongodb').mongoConnect;
const masjidRoute = require('./routes/masjid');
const muajjinRoute = require('./routes/muajjin');
const authRoute = require('./routes/auth');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/masjid', masjidRoute);
app.use('/muajjin', muajjinRoute);
app.use('/auth', authRoute);

app.use((error, req, res, next) => {
    
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    console.log('inside appjs error middleware');
    console.log(status, message);

    res.status(status).json({message: message, data: data });

})

// app.use('/muazzim', muazzimRoute);s

// app.use((req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'home.html'));
// });

// mongoConnect(() => {
//     app.listen(3000);
// });

sequelize.sync()
.then(result =>{
    mongoose
.connect('mongodb+srv://tarikul13:mongotarikul13@cluster0.llyo3.mongodb.net/MasjidTimeDB?retryWrites=true&w=majority')
.then(result => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});
})
.catch(err => {
    console.log(err);

})