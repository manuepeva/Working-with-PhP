const express = require('express');
const router = express.Router();
const proyectoController = require('../Controllers/proyectoController');
const auth = require('../Middleware/auth');
const { check } = require('express-validator');
// Crea proyectos

// api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El Nombre del Proyecto es Obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);
// Obtener todos los proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
)

// Actualizar los proyectos via ID
router.put('/:id',
    auth,
    [
        check('nombre', 'El Nombre del Proyecto es Obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

// Eliminar un proyecto
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
);



module.exports = router;