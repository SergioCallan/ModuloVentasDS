import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SellDetails = () => {
  const { id_detalle } = useParams();
  const [details, setDetails] = useState(null);
  const [client, setClient] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const detailsResponse = await axios.get(`https://modulo-ventas.onrender.com/selldetails/${id_detalle}`);
        setDetails(detailsResponse.data);

        if (detailsResponse.data) {
          const clientResponse = await axios.get(`https://modulo-ventas.onrender.com/searchdni/${detailsResponse.data.dni_cliente}`);
          setClient(clientResponse.data);
        }
      } catch (err) {
        console.error('Error al obtener los detalles de la venta o el cliente:', err);
        setError('Ocurrió un error al obtener los detalles de la venta o la información del cliente.');
      }
    };

    fetchDetails();
  }, [id_detalle]);

  const downloadPdfDocument = () => {
    const domElement = document.getElementById('boletaContainer');
    html2canvas(domElement, {
      onclone: (document) => {
        document.getElementById('boletaContainer').style.visibility = 'visible';
      }
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('boleta.pdf');
    });
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!details || !client) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <div id="boletaContainer" className="boleta-container">
        <h1>Boleta de Venta</h1>
        <div className="cliente-info">
          <h2>Información del Cliente</h2>
          <p>Nombre: {client.nombre}</p>
          <p>Apellido: {client.apellido}</p>
          <p>DNI: {client.dni}</p>
          <p>Correo: {client.correo}</p>
          <p>Sexo: {client.sexo}</p>
        </div>

        <div className="venta-info">
          <h2>Detalles de la Venta</h2>
          <p>ID Venta: {details.id_venta}</p>
          <p>ID Detalle: {details.id_detalle}</p>
          <p>ID Producto: {details.id_producto}</p>
          <p>Cantidad: {details.cantidad}</p>
          <p>ID Garantía: {details.id_garantia}</p>
          <p>Tipo: {details.tipo}</p>
          <p>Tiempo de Garantía: {details.tiempo_garantia}</p>
        </div>
      </div>
      <button onClick={downloadPdfDocument}>Descargar Boleta</button>
    </div>
  );
};

export default SellDetails;