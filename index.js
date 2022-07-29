// importaciones
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

require('dotenv').config();

const app = express();

// connection DB Mongo
mongoose.connect('mongodb+srv://rogelio:rogelio28@cluster0.hsxd0.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => console.log('DB conectado'))
    .catch(err => console.log(err))

// permisos de CORS
app.use(cors({
    methods: 'GET,POST,PUT'
}));

// declaracion para recibir datos 
app.use(express.json());

//declaraciones de las rutas
app.use(require('./src/routes/web'));

//declaracion del puerto
let port = 4000;
app.listen(port, () => console.log('App corriendo en http://localhost:' + port) );