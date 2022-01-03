const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userShema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    masjids: [
        {
            type: Schema.Types.ObjectId,
            re: 'Masjid'
        }
    ]
})

module.exports = mongoose.model('User', userShema);