import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from '../Context/Alertas/AlertaContext';
import AuthContext from '../../Components/Context/Autenticacion/AuthContext';
import AuthState from "../Context/Autenticacion/AuthState";
import Alerta from "../Layout/Alerta";


const Login = (props) => {

  // Extraer los valores del context 
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;
  console.log(AuthState)

  // En caso de que el password o el usuario no exista
  useEffect(() => {
    if (autenticado) {
      props.history.push('/proyectos');
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history])

  // State para iniciar sesión
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",

  });

  const { email, password } = usuario;

  const onChangeIniciarSesion = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  // Cuando el usuario quiere iniciar sesión

  const onSubmit = (e) => {
    e.preventDefault();
    // Validar que no haya campos vacíos
    if (email.trim() === '' || password.trim() === '') {
      mostrarAlerta('Por favor llene todos los campos', 'alerta-error');
    }
    // Pasarlo al action
    iniciarSesion({ email, password });
  };

  return (
    <div className="form-usuario">
      <Alerta 
      alerta={alerta}
      />
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              data-cy="email-input"
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChangeIniciarSesion}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Contraseña</label>
            <input
              data-cy="contraseña-input"
              type="password"
              id="password"
              name="password"
              placeholder="Tu Contraseña"
              value={password}
              onChange={onChangeIniciarSesion}
            />
          </div>

          <div className="campo-form">
            <input
              data-cy="loginForm"
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>
        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Obtener una Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
