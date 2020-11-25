import React, { useContext, useState, useEffect } from "react";
import ProyectoContext from "../Context/Proyectos/ProyectoContext";
import TareaContext from "../Context/Tareas/TareaContext";

const FormTarea = () => {
  // Extraer si un proyecto esta activo
  const proyectosContext = useContext(ProyectoContext);
  const { proyecto } = proyectosContext;

  // Obtener la función del context de tarea
  const tareasContext = useContext(TareaContext);
  const {
    tareaseleccionada,
    errortarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea
  } = tareasContext;

  // Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: ''
      })
    }
  }, [tareaseleccionada])


  // State del formulario
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  // Extraer el nombre del proyecto

  const { nombre } = tarea;

  // Si no hay un proyecto seleccionado
  if (!proyecto) {
    return null;
  }

  // Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  // Leer los valores del formulario
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    // Detectar si es una edición o una nueva tarea
    if (tareaseleccionada === null) {
      // Agregar una nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    } else {
      // Actualizar tarea existente
      actualizarTarea(tarea);

      // Eliminar tarea seleccionada del state
      limpiarTarea();
    }

    // Obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual.id);

    // Reiniciar el form
    guardarTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            data-cy="input-tarea"
            type="text"
            className="input-text"
            placeholder="Nombre de la Tarea"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            data-cy="submit-tarea"
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
          />
        </div>
      </form>
      {errortarea ? (
        <p data-cy="alerta" className="mensaje error">El Nombre de la Tarea es Obligatorio</p>
      ) : null}
    </div>
  );
};
export default FormTarea;
