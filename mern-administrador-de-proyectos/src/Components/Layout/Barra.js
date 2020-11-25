import React, { useContext, useEffect } from "react";
import AuthContext from '../Context/Autenticacion/AuthContext';



const Barra = () => {

  // Revisar si el usuario está autenticado
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;
 
  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);




  return (
    <header className="app-header">
      {usuario ? <p className="nombre-usuario">Wie Geht´s <span>{usuario.nombre}</span></p> : null}

      <nav className="nav-principal">
        <button
          data-cy="cerrar-sesion"
          className="btn btn-blank cerrar-sesion"
          onClick={() => cerrarSesion()}
        >Cerrar Sesión</button>
      </nav>
    </header>
  );
};

export default Barra;
