import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SellDetails = () => {
  const [clientDetails, setClientDetails] = useState(null);
  const [error, setError] = useState('');
  const { id_detalle } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`https://modulo-ventas.onrender.com/selldetails/${id_detalle}`);
        setClientDetails(response.data);
      } catch (error) {
        console.error('Error al obtener detalles de la venta y del cliente', error);
        setError('Ocurrió un error al obtener los detalles de la venta y del cliente.');
      }
    };

    fetchDetails();
  }, [id_detalle]);

  return (
    <div>
      <h2>Detalles de la Venta y Cliente</h2>
      {error && <p>{error}</p>}
      {clientDetails && (
        <div>
          <p>Nombre: {clientDetails.nombre}</p>
          <p>Apellido: {clientDetails.apellido}</p>
          <p>Correo: {clientDetails.correo}</p>
          <p>Sexo: {clientDetails.sexo}</p>
        </div>
      )}
    </div>
  );
};

export default SellDetails;