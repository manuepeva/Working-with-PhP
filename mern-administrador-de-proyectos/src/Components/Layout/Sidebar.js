import React from "react";
import NuevoProyecto from "../Proyectos/NuevoProyecto";
import ListadoProyecto from "../Proyectos/ListadoProyecto";

const Sidebar = () => {
  return (
    <aside>
      <h1>
        MERN<span>Tasks</span>
      </h1>
      <NuevoProyecto />
      <div className="proyectos">
        <h2>Tus Proyectos</h2>
        <ListadoProyecto />
      </div>
    </aside>
  );
};

export default Sidebar;
