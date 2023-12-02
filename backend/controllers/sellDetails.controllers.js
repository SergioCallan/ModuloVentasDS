// Controlador en tu backend
const pool= require ('../db')
const logError = require('./errorHandler');

// Controlador para encontrar los detalles de la venta según id_detalle
const getDetalleVentaById = async (req, res) => {
  try {
    const { id_detalle } = req.params;
    const query = 'SELECT * FROM detalleventa WHERE id_detalle = $1';
    const result = await pool.query(query, [id_detalle]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Detalle de venta no encontrado.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener el detalle de la venta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
    logError(error);
  }
};

// Controlador para obtener id_venta a partir de id_detalle
const getIdVentaByIdDetalle = async (req, res) => {
  try {
    const { id_detalle } = req.params;
    const query = 'SELECT id_venta FROM detalleventa WHERE id_detalle = $1';
    const result = await pool.query(query, [id_detalle]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Detalle de venta no encontrado.' });
    }

    // Extrae id_venta de los resultados y devuélvelo
    const id_venta = result.rows[0].id_venta;
    res.json({ id_venta }); // Devuelve el id_venta
  } catch (error) {
    console.error('Error al obtener el id_venta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
    logError(error);
  }
};

// Controlador para obtener dni_cliente a partir de id_venta
const getDniClienteByIdVenta = async (req, res) => {
  try {
    const { id_venta } = req.params;
    const query = 'SELECT dni_cliente FROM venta WHERE id_venta = $1';
    const result = await pool.query(query, [id_venta]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado para la venta.' });
    }

    const dni_cliente = result.rows[0].dni_cliente;
    res.json({ dni_cliente }); // Devuelve el dni_cliente
  } catch (error) {
    console.error('Error al obtener el dni del cliente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
    logError(error);
  }
};




module.exports = {
  getDetalleVentaById,
  getIdVentaByIdDetalle,
  getDniClienteByIdVenta
}