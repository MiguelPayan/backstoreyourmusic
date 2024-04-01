const title = 'INDEX DESDE EL SERVIDOR CON PUG y desde una variable';
const userscontroller = {};
const usuarioModel = require('../models/usuarios.model')
const connection = require('../db-conection/conection');

userscontroller.mostrar = async (req, res) =>{
    try{
                
        console.log("Cliente se ha conectado");
        await connection()
       
        const usuarios = await usuarioModel.find();
        
        // console.log('JSON' + usuarios);
        console.log('CONNECTION OK desde usuarios')
        console.log(usuarios)
        res.send(usuarios)
}catch(err){
        console.log(err);
}   
}

module.exports = userscontroller;