const express = require("express");
const multer = require ("multer")
const fs = require('node:fs')
const router = express.Router();
const bodyparser = require('body-parser');
const controller = require ('../controller/index.controller');
const controllerusers = require ('../controller/usuarios.controller');

const upload = multer({dest: './canciones/'})

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
    return newPath;
}

router.use('/canciones',express.static('./canciones'))

router.get('/mostrarcanciones', async (req, res) => {
   await fs.readdir('./canciones', (err, files) => {
        if (err) {
            return res.status(500).send('Error al leer el directorio');
        }
         res.send(files);
    });
});

module.exports = router;