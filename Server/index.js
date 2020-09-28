const express = require('express');
const conectDB = require('./Config/db');
const cors = require('cors');

// Crear el servidor
const app = express();

// Conectar a la base de datos
conectDB();

// Habilitar CORS
app.use(cors());

// Habilitar express.json
app.use(express.json({ extend: true }));

// Puerto de la App
const PORT = process.env.PORT || 2400;

// Importar rutas
app.use('/api/usuarios', require('./Routes/usuarios'));

app.use('/api/auth', require('./Routes/auth'));

app.use('/api/proyectos', require('./Routes/proyectos'));

app.use('/api/tareas', require('./Routes/tareas'));


app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
})