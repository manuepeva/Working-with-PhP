import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import NuevaCuenta from "./Components/Auth/NuevaCuenta";
import Proyectos from "./Components/Proyectos/Proyectos";
import ProyectoState from "./Components/Context/Proyectos/ProyectoState";
import TareaState from "./Components/Context/Tareas/TareaState";
import AlertaState from './Components/Context/Alertas/AlertaState';
import AuthState from './Components/Context/Autenticacion/AuthState';
import tokenAuth from './Config/tokenAuth';
import RutaPrivada from './Components/Rutas/RutaPrivada';


// Revisar si existe un token o no
const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
