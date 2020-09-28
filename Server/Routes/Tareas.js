const express = require('express');
const router = express.Router();
const tareaController = require('../Controllers/tareaController');
const auth = require('../Middleware/auth');
const { check } = require('express-validator');

// Crear una tarea

// api/tareas

router.post('/',
    auth,
    [
        check('nombre', 'El Nombre es Obligatorio').not().isEmpty(),
        check('proyecto', 'El Proyecto es Obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

// Obtener las tareas por proyecto
router.get('/',
    auth,
    tareaController.obtenerTareas
);

// Actualizar tarea
router.put('/:id',
    auth,
    tareaController.actualizarTarea
);
// Eliminar una tarea
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
);


module.exports = router; 