// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../Controllers/usuarioController');
const { check } = require('express-validator');

// Crea un usuario 
// api/usuarios
router.post('/',
    [
        check('nombre', 'El Nombre es Obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser mínimo de seis caracteres').isLength({ min: 6 })
    ],
    usuarioController.crearUsuario
);


module.exports = router;