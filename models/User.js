// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    picture: { type: String },
    name: { type: String, required: true },
    familyname: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    profile: {
        nombreArtistico: { type: String },
        edad: { type: String },
        facebook: { type: String },
        spotify: { type: String },
        youtube: { type: String }
    }
});

module.exports = mongoose.model('User', UserSchema);
