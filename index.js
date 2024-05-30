require('dotenv').config();

const express = require("express");
const path = require("path");
const bodyparser = require('body-parser');
const cors = require('cors');
const multer = require("multer");
const { BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs');
const routes = require("./routes/index.routes");
const conexion = require('./db-conection/mysql_conection');
const app = express();
const port = process.env.PORT || 3000;
// Configuración de multer
const upload = multer({ dest: 'uploads/' });

// Cadena de conexión de tu cuenta de almacenamiento
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

// Nombre del contenedor
const containerName = "cloudc";

app.use(cors());

app.set('view engine','pug');
app.set('views', path.join(__dirname,'/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    bodyparser.urlencoded({
        limit : '20mb',
        extended : true
    })
);
app.use(bodyparser.json({ type: 'application/json' }));

// Ruta para subir archivos
app.post('/upload', upload.single('file'), async (req, res) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    
    // Crea el contenedor si no existe
    await containerClient.createIfNotExists();

    // Ruta al archivo subido
    const localFilePath = path.join(__dirname, req.file.path);
    const blobName = req.file.originalname;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
        // Subir el archivo
        const data = fs.readFileSync(localFilePath);
        await blockBlobClient.upload(data, data.length);
        fs.unlinkSync(localFilePath); // Elimina el archivo local después de subirlo
        res.status(200).send(`Archivo ${blobName} subido exitosamente`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al subir el archivo');
    }
});

app.post('/uploadsql',bodyparser.json(),async (req,res) => {
    //Conseguir lo sig. para subir las canciones:
    //Email
    //Enlace = Titulo
    //IdArtista
    const valores = req.body;
    //Titulo
    let titulo = valores.titulo;
    //Email
    let correo = valores.email;
    let idArtista;
    //Enlace = Titulo
    let enlace = `https://storeyourmusic01.blob.core.windows.net/cloudc/${titulo}`;
    //idArtista
    try {
        conexion.query(`select idartistas from artistas where email = "${correo}";`,(error,resultado,a) =>{
            if(error){
                console.log('Error en el select idartista')
                console.log(error)
                return;
            }
            idArtista = resultado[0].idartistas;
            console.log(idArtista);
            try {
                conexion.query(`insert into canciones (titulo, idartista, enlace) values ("${titulo}", ${idArtista}, "${enlace}");`,
                    (error, resultados, campos) => {
                    if (error){
                        console.error(error)
                        return;
                    }
                    console.log('Se inserto la cancion en mysql');
                    
                    }
            );
            }catch(error){
                console.log("Error despues de obtener el id");
                console.error(error)
            }
        })
    }catch(error){
        console.log('Error al obtener id del artista')
        console.error(error);
    }

    res.send('Si jalowin')
    //conexion.query()
});

// Nueva ruta para obtener la lista de canciones
app.get('/songs', async (req, res) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    try {
        let blobs = [];
        for await (const blob of containerClient.listBlobsFlat()) {
            blobs.push(blob.name);
        }
        res.status(200).json(blobs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la lista de canciones');
    }
});

app.get('/getcanciones', async (req, res) => {
    conexion.query('SELECT * FROM canciones;',(error,resultados) =>{
        if(error){
            console.error(error);
            return;
        }
        res.send(resultados)
    })
});

app.post('/visita',bodyparser.json(),async(req,res)=>{
    let idcancion = await req.body;
    idcancion = await idcancion.idcancion;
    console.log(idcancion)
    conexion.query(`update canciones set visitas = visitas + 1 where idcanciones = ${idcancion};`,(error,resultados) =>{
        if(error){
            console.error('Ocurrio un error')
            console.error(error);
            return;
        }
        res.send("Visita sumada!")
    })
})

app.use(routes);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../public/404.html'));
});

// STATIC FILES
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () =>{
    console.log("A la espera de conexiones");
});
console.log('HOLA MUNDO');
