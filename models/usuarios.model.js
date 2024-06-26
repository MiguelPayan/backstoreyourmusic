const mongoose = require('mongoose');

const {Schema} = mongoose

const SchemaUsuario = new Schema({
    email: {
        type : String,
        unique: true,
        required: true},
    picture:{
        type : String
    },
    name: {
        type : String
    }, 
    familyname: {
        type: String
    }
},
{
    versionKey: false,
    timestamps: true
});

const ModelUsuario = mongoose.model('usuarioslogeados', SchemaUsuario);

module.exports = ModelUsuario;