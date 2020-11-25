import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import ProyectoContext from "../Context/Proyectos/ProyectoContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AlertaContext from '../../Components/Context/Alertas/AlertaContext';



const ListadoProyectos = () => {
  // Extraer proyectos del state inicial

  const proyectoContext = useContext(ProyectoContext);

  const { mensaje, proyectos, obtenerProyectos } = proyectoContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    // Si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    obtenerProyectos();
    // eslint-disable-next-line
  }, [mensaje]);

  // Revisar si proyectos esta vacío o no

  if (proyectos.length === 0)
    return <p>No Hay Proyectos, comienza creando uno</p>;

  return (
    <ul data-cy="listado-proyectos" className="listado-proyectos">
      {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition
            key={proyecto._id}
            timeout={200}
            classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
