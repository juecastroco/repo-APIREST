// console.log("Hola Mundo desde Node.js")
require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());

//Conexión a base de datos
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Conectado a la base de datos'))


const tareasRouter = require('./routes/tareas');
app.use('/tareas', tareasRouter)
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000')
});