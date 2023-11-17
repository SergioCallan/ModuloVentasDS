import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const SearchById = () => {
  const [id, setId] = useState('');
  const [details, setDetails] = useState([]);
  const [error, setError] = useState('');
  const [venta, setVenta] = useState('');
  const navigate = useNavigate(); // Hook para navegar

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://modulo-ventas.onrender.com/getselldetails/${id}`);
      setDetails(response.data);
      setError('');
    } catch (error) {
      console.error('Error al buscar por ID', error);
      setError('Ocurrió un error al buscar por ID.');
      setDetails([]);
    }
  };

  const detailVenta = async (id_venta) => {
    try {
      const idventa = id_venta;
      const response = await axios.get(`https://modulo-ventas.onrender.com/getselldetails/${idventa}`);
      setDetails(response.data); // Asegúrate de que setDetails recibe un arreglo
      setError('');
    } catch (error) {
      console.error('Error al obtener la última venta', error);
      setError('Ocurrió un error al obtener la última venta.');
      setVenta([]);
    }
  }
  const handleLastSell = async () => {
    try {
      const response = await axios.get(`https://modulo-ventas.onrender.com/sell/last`);

      setVenta([response.data]); // Asegúrate de que setDetails recibe un arreglo
      setError('');
      detailVenta (response.data.id_venta); //Creada 
    } catch (error) {
      console.error('Error al obtener la última venta', error);
      setError('Ocurrió un error al obtener la última venta.');
      setVenta([]);
    }

    
  
  };

  // Función para manejar el click en "Ver más"
  const handleViewMore = (idDetalle) => {
    navigate(`/selldetails/${idDetalle}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Buscar por ID</h2>
      <div style={styles.searchSection}>
        <input
          type="text"
          style={styles.input}
          placeholder="Ingrese el ID de Venta"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button style={styles.button} onClick={handleSearch}>Buscar</button>
        <button style={{ ...styles.button, ...styles.lastSellButton }} onClick={handleLastSell}>Última Venta</button>
      </div>
      {error && <p style={styles.error}>{error}</p>}
      <h2 style={styles.header}>Detalles de la Venta</h2>
      <table style={styles.table}>
    <thead>
      <tr>
        {/* Añade styles.tableCell a cada <th> para que coincida con las celdas del cuerpo */}
        <th style={styles.tableCell}>ID Detalle</th>
        <th style={styles.tableCell}>ID Venta</th>
        <th style={styles.tableCell}>ID Producto</th>
        <th style={styles.tableCell}>Cantidad</th>
        <th style={styles.tableCell}>ID Garantía</th>
        <th style={styles.tableCell}>Tipo</th>
        <th style={styles.tableCell}>Tiempo de Garantía</th>
        <th style={styles.tableCell}>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {details.map((detalle, index) => (
        <tr key={index}>
          {/* Aplica el estilo a cada <td> */}
          <td style={styles.tableCell}>{detalle.id_venta}</td>
          <td style={styles.tableCell}>{detalle.id_detalle}</td>
          <td style={styles.tableCell}>{detalle.id_producto}</td>
          <td style={styles.tableCell}>{detalle.cantidad}</td>
          <td style={styles.tableCell}>{detalle.id_garantia}</td>
          <td style={styles.tableCell}>{detalle.tipo}</td>
          <td style={styles.tableCell}>{detalle.tiempo_garantia}</td>
          <td style={styles.tableCell}>
            <button style={styles.viewMoreButton} onClick={() => handleViewMore(detalle.id_detalle)}>Ver más</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    color: '#333',
    borderBottom: '2px solid #333',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  searchSection: {
    marginBottom: '20px',
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  lastSellButton: {
    backgroundColor: '#28a745',
  },
  error: {
    color: 'red',
    margin: '10px 0',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },
  viewMoreButton: {
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: '#ffc107',
    color: 'black',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default SearchById;
