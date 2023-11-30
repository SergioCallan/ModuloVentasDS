const pool = require('../db');
const axios = require('axios');

const getSellAndClientDetails = async (req, res) => {
  try {
    const { id_detalle } = req.params;
    
    // Primero, obtén el id_venta basado en el id_detalle
    const sellDetailsQuery = 'SELECT * FROM detalleventa WHERE id_detalle = $1';
    const sellDetailsResult = await pool.query(sellDetailsQuery, [id_detalle]);

    if (sellDetailsResult.rows.length === 0) {
      return res.status(404).json({ message: 'Detalle de venta no encontrado.' });
    }

    // Después, usa id_venta para obtener dni_cliente de la tabla venta
    const id_venta = sellDetailsResult.rows[0].id_venta;
    const ventaQuery = 'SELECT dni_cliente FROM venta WHERE id_venta = $1';
    const ventaResult = await pool.query(ventaQuery, [id_venta]);

    if (ventaResult.rows.length === 0) {
      return res.status(404).json({ message: 'Venta no encontrada.' });
    }

    const dniCliente = ventaResult.rows[0].dni_cliente;
    if (!dniCliente) {
      return res.status(404).json({ message: 'DNI del cliente no encontrado.' });
    }

    // Finalmente, con el dni_cliente obtén la información del cliente de la API externa
    const clientResponse = await axios.get(`https://clientemodulocrm.onrender.com/clientes/buscarPorDNI/${dniCliente}`);
    if (!clientResponse.data) {
      return res.status(404).json({ message: 'Datos del cliente no encontrados.' });
    }

    const cliente = {
      nombre: clientResponse.data.nombre,
      apellido: clientResponse.data.apellido,
      correo: clientResponse.data.correo,
      sexo: clientResponse.data.sexo
      // Incluye aquí otros campos que necesites
    };

    // Combina los detalles de venta con la información del cliente y envía la respuesta
    const responseData = {
      detalleVenta: sellDetailsResult.rows[0],
      cliente: cliente
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error al obtener detalles de venta y cliente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getSellAndClientDetails
};
