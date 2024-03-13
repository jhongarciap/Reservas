import React, { useState } from 'react';
import SeleccionarAsiento from './component.jsx'; // Ajusta la ruta según la ubicación real de tu componente
import './App.css';

const datosIniciales = [
  { numeroPasajero: "1", nombre: 'Juan Pablo Castro', asiento: '', especificaciones: 'No Asignado' },
  { numeroPasajero: "2", nombre: 'Jhon Alejandro Garcia', asiento: '', especificaciones: 'No Asignado' },
  { numeroPasajero: "3", nombre: 'David Camilo Garcia', asiento: '', especificaciones: 'No Asignado' },
  { numeroPasajero: "4", nombre: 'Jose Andres Echavarria', asiento: '', especificaciones: 'No Asignado' }
];

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pasajeros, setPasajeros] = useState(datosIniciales);
  const [pasajeroSeleccionado, setPasajeroSeleccionado] = useState(null);

  const openModal = (pasajero) => {
    setPasajeroSeleccionado(pasajero);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const actualizarEspecificaciones = (asientoSeleccionado) => {
    // Actualizar la propiedad 'especificaciones' del pasajero seleccionado
    if (pasajeroSeleccionado) {
      const nuevosPasajeros = pasajeros.map(pasajero =>
        pasajero.numeroPasajero === pasajeroSeleccionado.numeroPasajero
          ? { ...pasajero, especificaciones: asientoSeleccionado }
          : pasajero
      );
      setPasajeros(nuevosPasajeros);
    }
    closeModal();
  };

  return (
    <div>
      <header className="primero">
        <div className="titulo-res">
          <h1 className="titulo-reserva"> # de Numero de reserva </h1>
        </div>
        <div className="pasajeros">
          <h4 className="pasajeros-titulo">Cantidad de pasajeros: {pasajeros.length}</h4>
        </div>
      </header>

      <header className="segundo">
        <div className="titulo-listado">
          <div className="listado">
            <h3 className="titulo-listado-pasajeros">Listado de pasajeros</h3>
          </div>
        </div>
      </header>

      <hr style={{ borderColor: "#2196F3", width: "95%" }} />

      <div className='tabla'>
        <table>
          <tbody>
            {pasajeros.map((pasajero) => (
              <tr key={pasajero.numeroPasajero}>
                <td>
                  <img
                    src={process.env.PUBLIC_URL + '/Images/usuario.png'}
                    style={{ width: '60px', height: '60px' }}
                    alt="Avatar"
                  />
                </td>
                <td>
                  <h3>{pasajero.nombre}</h3>
                  <h6> Pasajero: {pasajero.numeroPasajero}</h6>
                </td>
                <td>
                  <button onClick={() => openModal(pasajero)}>Seleccionar asiento</button>
                </td>
                <td>
                  <div className='asignación'>
                    <h3>{pasajero.especificaciones}</h3>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modalVisible && <SeleccionarAsiento onClose={actualizarEspecificaciones} pasajero={pasajeroSeleccionado} />}
      </div>
    </div>
  );
}

export default App;
