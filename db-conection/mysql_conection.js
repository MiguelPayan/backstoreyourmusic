// Importar el módulo mysql
const mysql = require('mysql');

// Configurar la conexión a la base de datos
const conexion = mysql.createConnection({
  host: 'bciaezjygbkdjwgavzbq-mysql.services.clever-cloud.com',
  user: 'ueg0h3ihnkblsw73',
  password: 'eoCYZkbYnQ0Yxq7Dk06y',
  database: 'bciaezjygbkdjwgavzbq'
});

// Establecer la conexión
conexion.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    return;
  }
  console.log('Conexión exitosa a MySQL');
});


module.exports = conexion;