import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from '../../Components/Context/Alertas/AlertaContext';
import AuthContext from '../../Components/Context/Autenticacion/AuthContext';
import Alerta from "../Layout/Alerta";


const NuevaCuenta = (props) => {

  // Extraer los valores del Alerta Context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  // En caso de que el usuario se haya autenticado o registradoo sea un registro duplicado
  useEffect(() => {
    if (autenticado) {
      props.history.push('/proyectos');
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);


  // State para iniciar sesión
  const [usuario, guardarUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const { nombre, email, password, confirmar } = usuario;

  const onChangeIniciarSesion = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  // Cuando el usuario quiere inicar sesión

  const onSubmit = (e) => {
    e.preventDefault();
    // Validar que no haya campos vacíos
    if (nombre.trim() === '' || email.trim() === '' || password.trim() === '' ||
      confirmar.trim() === '') {
      mostrarAlerta('Todos los Campos son Requeridos', 'alerta-error');
      return;
    }
    // Password mínimo de seis caracteres
    if (password.length < 6) {
      mostrarAlerta('La Contraseña debe ser al menos de seis Caracteres', 'alerta-error');
      return;
    }
    // Las contraseñas deben ser iguales
    if (password !== confirmar) {
      mostrarAlerta('Ambas Contraseñas deben ser iguales', 'alerta-error');
      return;
    }
    // Pasarlo al action
    registrarUsuario({
      nombre,
      email,
      password
    })


  };

  return (
    <div className="form-usuario">
      <Alerta 
      alerta={alerta}
      />
      <div className="contenedor-form sombra-dark">
        <h1 data-cy="nueva-cuenta">Obtener una Cuenta</h1>
        <form 
        data-cy="form-cuenta"
        onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              data-cy="nombreForm"
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre"
              value={nombre}
              onChange={onChangeIniciarSesion}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              data-cy="nombreEmail"
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
              data-cy="nombreContraseña"
              type="password"
              id="password"
              name="password"
              placeholder="Tu Contraseña"
              value={password}
              onChange={onChangeIniciarSesion}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar Contraseña</label>
            <input
              data-cy="nombreConfirmar"
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Repetir la Contraseña"
              value={confirmar}
              onChange={onChangeIniciarSesion}
            />
          </div>

          <div className="campo-form">
            <input
              data-cy="submit-nueva-cuenta"
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrar Nueva Cuenta"
            />
          </div>
        </form>
        <Link 
        data-cy="volver-a-iniciar"
        to={"/"} 
        className="enlace-cuenta">
          Volver a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
