import { useState, useEffect } from "react";
import { formatearFecha } from "../helpers";
import cerrarBtn from "../img/cerrar.svg";
import alertaPop from "./alertas";


const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar
}) => {
  //Hooks para los valores del formulario
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [id, setId] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {

    if (Object.keys(gastoEditar).length > 0) {

      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)

    }
  }, [])

  const cerrarModal = () => {
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
    gastoEditar({})
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if ([nombre, cantidad, categoria].includes("")) {
      
      alertaPop("error", "Oops!", "Todos los campos son obligatorios");

      return;
    }

    guardarGasto({ nombre, cantidad, categoria, id, fecha })


  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={cerrarBtn} alt="Botón cerrar" onClick={cerrarModal} />
      </div>

      <form
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
        <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Añade la cantidad del gasto: Ej. 10.000"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            autoComplete="off"
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="Ahorro">Ahorro</option>
            <option value="Comida">Comida</option>
            <option value="Casa">Casa</option>
            <option value="Gastos">Gastos</option>
            <option value="Ocio">Ocio</option>
            <option value="Salud">Salud</option>
            <option value="Suscripciones">Suscripciones</option>
          </select>
        </div>

        <input type="submit" value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'} />
      </form>
    </div>
  );
};

export default Modal;
