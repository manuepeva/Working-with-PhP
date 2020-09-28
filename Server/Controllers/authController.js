const Usuario = require('../Models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }
    // Extraer el email y password del 
    const { email, password } = req.body;

    try {
        // Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'El Usuario no Existe' });
        }

        // Revisar el password del usuario
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json({ msg: 'El Password es incorrecto' })
        }
        // Si todo es correcto crear y firmar el json web token
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        // Firmar el json web token
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if (error) throw error;

            // Mensaje de confirmación 
            res.json({ token });
        });


    } catch (error) {
        console.log(error);
    }

}

// Obtiene que usuario está autenticado

exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({ usuario });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ocurrió un error' });
    }
}