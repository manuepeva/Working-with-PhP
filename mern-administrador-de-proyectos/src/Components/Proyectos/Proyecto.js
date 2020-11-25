import React, { useContext } from "react";
import ProyectoContext from "../Context/Proyectos/ProyectoContext";
import TareaContext from "../Context/Tareas/TareaContext";

const Proyecto = ({ proyecto }) => {
  // Obtener el state de proyectos

  const proyectosContext = useContext(ProyectoContext);

  const { proyectoActual } = proyectosContext;

  // Obtener la función del context de tarea
  const tareasContext = useContext(TareaContext);
  const { obtenerTareas } = tareasContext;

  // Funcion para agregar el proyecto actual
  const seleccionarProyecto = (id) => {
    proyectoActual(id); // Fijar un proyecto actual
    obtenerTareas(id); // Filtrar las tareas cuando se haga click
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
