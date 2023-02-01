import React from "react";
import alertaPop from "./alertas";


const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setPresupuestoValido,
}) => {
  const handlePresupuesto = (e) => {
    e.preventDefault();

    if (!presupuesto || presupuesto < 0) {
      alertaPop("error", "Oops!", "No es un presupuesto valido");
      setPresupuestoValido(false);

      return;
    }
    setPresupuestoValido(true);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label htmlFor="">Definir presupuesto</label>
          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu presupuesto"
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
        </div>
        <input type="submit" value="Añadir" />
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
