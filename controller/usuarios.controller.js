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

userscontroller.delete = async (req, res) => {
        console.log("Cliente se ha conectado");
        await connection()
        const correo = req.body.email;

        const eliminado = await usuarioModel.deleteOne({ email: correo });
        
        // console.log('JSON' + usuarios);
        console.log(`Usuario eliminado`)
        console.log(correo)
        res.sendStatus(200)
        res.send("Eliminaste un usuario canijo")        
}

module.exports = userscontroller;