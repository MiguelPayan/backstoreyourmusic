require('dotenv').config();

const express = require("express");
const path = require("path");
const bodyparser = require('body-parser');
const cors = require('cors');
const multer = require("multer");
const { BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs');
const routes = require("./routes/index.routes");
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
