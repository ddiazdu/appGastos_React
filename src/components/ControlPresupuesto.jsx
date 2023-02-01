import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import Swal from "sweetalert2";
import alertaPop from "./alertas";

const ControlPresupuesto = ({

  presupuesto,
  setPresupuesto,
  gastos,
  setGastos,
  setPresupuestoValido }) => {

  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {

    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );

    const totalDisponible = presupuesto - totalGastado;

    //Calcular el porcentaje gastado
    const nuevoPorcentaje = ((presupuesto - totalDisponible) / presupuesto) * 100;

    setDisponible(totalDisponible);
    setGastado(totalGastado);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje.toFixed(2));
    }, 1000);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
    });
  };

  const handleReset = () => {

    Swal.fire({
      title: 'Estas seguro?',
      text: "Perderas todos los datos de tu presupuesto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, reestablecelo!'
    }).then((result) => {
      if (result.isConfirmed) {

        setGastos([])
        setPresupuesto(0)
        setPresupuestoValido(false)
        alertaPop('success', 'Reestablecido', 'Su presupuesto ha sido reestablecido.');


      }
    })

  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <p>
          <CircularProgressbar

            styles={buildStyles({

              pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
              trailColor: '#F5F5F5',
              textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'


            })}
            value={porcentaje}
            text={`${porcentaje}% Gastado`}

          />


        </p>
      </div>
      <div className="contenido-presupuesto">
        <button

          className="reset-app"
          type="button"
          onClick={handleReset}
        >
          Reseteat APP
        </button>
        <p>
          <span>Presupuesto: </span>
          {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span>
          {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span>
          {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
