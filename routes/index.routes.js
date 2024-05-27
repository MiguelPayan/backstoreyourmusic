const express = require("express");
const multer = require ("multer")
const fs = require('node:fs')
const router = express.Router();
const bodyparser = require('body-parser');
const controller = require ('../controller/index.controller');
const controllerusers = require ('../controller/usuarios.controller');

const upload = multer({dest: 'canciones/'})

router.post('/',bodyparser.json(), controller.insertar);

router.get('/', controller.index);

router.get('/usuarios', controllerusers.mostrar);

router.post('/eliminaruser', controllerusers.delete);

router.post('/cancion/single', upload.single('cancion') ,(req,res)=>{
    console.log(req.file)
    renombrar(req.file);
    res.send('Terminadisimo')
})

async function renombrar(file){
    const newPath = await `./canciones/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    await console.log(newPath);
    await console.log(__dirname)
    return newPath;
}

router.use('/canciones',express.static('./canciones'))

module.exports = router;