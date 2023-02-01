import { useState, useEffect } from "react";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal";
import Filtros from "./components/Filtros";
import { generarId } from "./helpers";
import { formatearFecha } from "./helpers";

function App() {
  const [presupuesto, setPresupuesto] = useState(

    Number(localStorage.getItem('presupuesto')) ?? 0

  );
  const [presupuestoValido, setPresupuestoValido] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(

    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []

  );
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  /*   
  
    Se queda a la escucha cuando haya un cambio en gastoEditar, en este caso 
    En Gasto.jsx al deslizar a la derecha se setea gastoEditar con su respecitvo set
  
  */
  useEffect(() => {

    if (Object.keys(gastoEditar).length > 0) {

      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }


  }, [gastoEditar])

  useEffect(() => {

    localStorage.setItem('presupuesto', presupuesto ?? 0)

  }, [presupuesto])

  useEffect(() => {

    if (filtro) {
      //Filtrar por categoria

      const gastosFiltrados = gastos.filter((gasto) => gasto.categoria === filtro)

      setGastosFiltrados(gastosFiltrados)

    }

  }, [filtro])

  useEffect(() => {

    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])

  }, [gastos])


  useEffect(() => {

    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if (presupuestoLS > 0) {

      setPresupuestoValido(true)

    }

  }, [])

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);

  };

  const guardarGasto = (gasto) => {

    if (gastoEditar.id) {
      //Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})

    } else {
      //Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = formatearFecha(Date.now());
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {

    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)

    setGastos(gastosActualizados);

  }

  return (
    <div className={modal ? "fijar" : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        presupuestoValido={presupuestoValido}
        setPresupuestoValido={setPresupuestoValido}
      />
      {/* && En caso de que se quiera cumplir solo esa condicion en un ternario */}
      {presupuestoValido && (
        <>
          <main>

            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}

            />
            <ListadoGastos
              gastos={gastos}
              setGastos={setGastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
