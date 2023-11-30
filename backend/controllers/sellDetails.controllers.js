// controllers/sellDetails.controllers.js
const pool = require('../db');

const getSellAndClientDetails = async (req, res) => {
  try {
    const { id_detalle } = req.params;
    const sellDetailsQuery = 'SELECT * FROM detalleventa WHERE id_detalle = $1';
    const sellDetailsResult = await pool.query(sellDetailsQuery, [id_detalle]);

    if (sellDetailsResult.rows.length === 0) {
      return res.status(404).json({ message: 'Detalle de venta no encontrado.' });
    }

    const sellDetails = sellDetailsResult.rows[0];

    // Obtener el dni_cliente de los detalles de venta
    const dniCliente = sellDetails.dni_cliente;

    // Hacer una solicitud para obtener los datos del cliente por su DNI desde el servicio externo
    // Reemplaza la URL con la correcta para tu servicio
    const clientResponse = await axios.get(`https://clientemodulocrm.onrender.com/clientes/buscarPorDNI/${dniCliente}`);

    // Extraer los datos del cliente
    const cliente = {
      nombre: clientResponse.data.nombre,
      apellido: clientResponse.data.apellido,
      correo: clientResponse.data.correo
    };

    // Combinar los detalles de la venta con los datos del cliente
    const responseData = {
      ...sellDetails,
      cliente: cliente
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error al obtener detalles de venta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getSellAndClientDetails
};
