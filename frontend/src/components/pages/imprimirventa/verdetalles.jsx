import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SellDetails = () => {
  const { id_detalle } = useParams();
  const [details, setDetails] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(true); // Asegúrate de que esta variable se use correctamente

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Obtener los detalles de la venta
        const response = await axios.get(`https://modulo-ventas.onrender.com/selldetailsbyid/${id_detalle}`);
        setDetails(response.data);

        // Obtener id_venta a partir de id_detalle
        const ventaResponse = await axios.get(`https://modulo-ventas.onrender.com/idventabyid/${id_detalle}`);
        const id_venta = ventaResponse.data.id_venta;
        // Obtener dni_cliente usando id_venta
        const clienteResponse = await axios.get(`https://modulo-ventas.onrender.com/clientebyid/${id_venta}`);
        const dni_cliente = clienteResponse.data.dni_cliente;

        // Obtener detalles del cliente usando dni_cliente
        if (dni_cliente) {
          const clientDetailsResponse = await axios.get(`https://clientemodulocrm.onrender.com/clientes/buscarPorDNI/${dni_cliente}`);
          setCliente(clientDetailsResponse.data);

        }

      } catch (error) {
        console.error('Error al obtener los detalles de la venta:', error);
        setError('Ocurrió un error al obtener los detalles de la venta.');
      }
    };

    fetchDetails();
  }, [id_detalle]);

  const downloadPdfDocument = () => {
    setIsButtonVisible(false); // Ocultar el botón antes de generar el PDF

    const domElement = document.getElementById('boletaContainer');
    html2canvas(domElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('boleta.pdf');

      setIsButtonVisible(true); // Mostrar el botón nuevamente
    });
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!details) {
    return <p>Cargando...</p>;
  }

  return (
    <div id='boletaContainer' style={boletaStyle}>
      <div style={headerStyle}>
        <h1>Boleta de Venta</h1>
      </div>
      <div style={detailStyle}>
        <span style={labelStyle}>ID Detalle:</span>
        <span>{details.id_detalle}</span>
      </div>
      <div style={detailStyle}>
        <span style={labelStyle}>ID Venta:</span>
        <span>{details.id_venta}</span>
      </div>
      <div style={detailStyle}>
        <span style={labelStyle}>ID Producto:</span>
        <span>{details.id_producto}</span>
      </div>
      <div style={detailStyle}>
        <span style={labelStyle}>Tipo:</span>
        <span>{details.tipo}</span>
      </div>
      <div style={detailStyle}>
        <span style={labelStyle}>Cantidad:</span>
        <span>{details.cantidad}</span>
      </div>
      <div style={detailStyle}>
        <span style={labelStyle}>ID Garantía:</span>
        <span>{details.id_garantia}</span>
      </div>
      <div style={detailStyle}>
        <span style={labelStyle}>Tiempo de Garantía:</span>
        <span>{details.tiempo_garantia}</span>
      </div>
      <div style={detailStyle}>
        <span style={labelStyle}>Coste total:</span>
        <span>{details.coste_total}</span>
      </div>
      <div style={detailStyle}>
            <span style={labelStyle}>Nombre del Cliente:</span>
            <span>{cliente?.nombre}</span>
          </div>
          <div style={detailStyle}>
            <span style={labelStyle}>Apellido del Cliente:</span>
            <span>{cliente?.apellido}</span>
          </div>
          <div style={detailStyle}>
            <span style={labelStyle}>Correo del Cliente:</span>
            <span>{cliente?.correo}</span>
          </div>
          <div style={detailStyle}>
            <span style={labelStyle}>Departamento del Cliente:</span>
            <span>{cliente?.departamento}</span>
          </div>
          <div style={detailStyle}>
            <span style={labelStyle}>Distrito del Cliente:</span>
            <span>{cliente?.distrito}</span>
          </div>
      {isButtonVisible && <button onClick={downloadPdfDocument}>Descargar Boleta</button>}
    </div>
  );
};

const boletaStyle = {
  maxWidth: '600px',
  margin: '20px auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9',
  fontFamily: 'Arial, sans-serif',
  color: '#333',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
};

const detailStyle = {
  margin: '10px 0',
  display: 'flex',
  justifyContent: 'space-between',
};

const labelStyle = {
  fontWeight: 'bold',
};

export default SellDetails;
