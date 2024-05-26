
//Rutas

const multer = require ("multer")
const routes = require ("./routes/index.routes");
const { index } = require("./controller/index.controller");
const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;

const upload = multer({dest: 'canciones/'})

app.use(cors());


app.set('view engine','pug');
app.set('views', path.join(__dirname,'/views'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    bodyparser.urlencoded({
        limit : '20mb',
        extended : true
    })
)
app.use(bodyparser.json({ type: 'application/json' }))
app.use(routes);


app.use((req,res) => {
    res.sendFile(path.join(__dirname, '../public/404.html'))
})

//STATIC FILES
app.use(express.static(path.join(__dirname, '../public')))



app.listen(port, () =>{
    console.log("A la espera de conexiones");
    
})

console.log('HOLA MUNDO');


