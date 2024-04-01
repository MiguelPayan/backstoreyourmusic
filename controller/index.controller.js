const controller = {};
const title = 'INDEX DESDE EL SERVIDOR CON PUG y desde una variable';
const usuarioModel = require('../models/usuarios.model')
const connection = require('../db-conection/conection');
//const { post } = require('../routes/index.routes');


controller.index = async (req,res) =>{    
        
        try{
                
                console.log("Cliente se ha conectado");
                await connection()
               
                const usuarios = await usuarioModel.find();
                
                console.log('JSON' + usuarios);
                console.log('CONNECTION OK with nodemon')
                res.render('index', {title})
        }catch(err){
                console.log(err);
        }    
}

controller.insertar = async (req, res) => {
        
        try{
                await connection()
                const datos = req.body;
                await usuarioModel.create(datos)
                console.log('ALGO vienE')
                console.log(datos);
                
        }catch(err){
                console.log('El error es ' + err);
                if(err.code == 11000){
                        console.log('OK, no se ha agregado el correo porque es un corredo ya registrado')
                }
        }
        
}

//Usuario: miguelpayan

//Contra: gCF25SySDHARRQKX

module.exports = controller;







