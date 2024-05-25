// index.js
const routes = require("./routes/index.routes");
const userRoutes = require("./routes/users.routes"); // Agregar las nuevas rutas de usuario
const { index } = require("./controller/index.controller");
const express = require("express");
const path = require("path");
const mongoose = require('mongoose'); // Asegúrate de tener la conexión a la base de datos
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    bodyparser.urlencoded({
        limit: '20mb',
        extended: true
    })
);
app.use(bodyparser.json({ type: 'application/json' }));

app.use(routes);
app.use('/users', userRoutes); // Usar las nuevas rutas de usuario

app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../public/404.html'));
});

// STATIC FILES
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
    console.log("A la espera de conexiones");
});

console.log('HOLA MUNDO');
