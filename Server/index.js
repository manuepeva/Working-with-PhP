const express = require('express');
const conectDB = require('./Config/db');
const cors = require('cors');

// Crear el servidor
const app = express();

// Conectar a la base de datos
conectDB();

// Configurar cors
var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// Habilitar CORS
app.use(cors());

// Habilitar express.json
app.use(express.json({ extend: true }));

// Puerto de la App
const PORT = process.env.PORT || 2400;

// Importar rutas
app.use('/api/usuarios', cors(), require('./Routes/usuarios'));

app.use('/api/auth', cors(), require('./Routes/auth'));

app.use('/api/proyectos', cors(), require('./Routes/proyectos'));

app.use('/api/tareas', cors(), require('./Routes/Tareas'));


app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
})