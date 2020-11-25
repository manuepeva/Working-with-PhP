import React, { Fragment, useContext } from "react";
import Tarea from "./Tarea";
import ProyectoContext from "../Context/Proyectos/ProyectoContext";
import TareaContext from "../Context/Tareas/TareaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoTareas = () => {
  // Extraer state inicial del proyecto
  const proyectosContext = useContext(ProyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  // Obtener las tareas del proyecto
  const tareasContext = useContext(TareaContext);
  const { tareasproyecto } = tareasContext;

  // Si no hay ningún proyecto seleccionado
  if (!proyecto) return <h2 data-cy="selecciona-proyecto">Selecciona un Proyecto</h2>;

  // Aplicando array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //  Eliminar un proyecto
  const onClickEliminar = () => {
    eliminarProyecto(proyectoActual._id);
  };

  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasproyecto.length === 0 ? (
          <li className="tarea">
            <p>No Hay Tareas</p>
          </li>
        ) : (
            <TransitionGroup>
              {tareasproyecto.map((tarea) => (
                <CSSTransition key={tarea.id} timeout={200} classNames="tarea">
                  <Tarea tarea={tarea} />
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onClickEliminar}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTareas;
