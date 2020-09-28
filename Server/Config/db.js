const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('Database Connected');
    } catch (error) {
        console.log(error);
        process.exit(1); // Detener la app si hay un error en la conexión
    }
}

module.exports = conectDB;