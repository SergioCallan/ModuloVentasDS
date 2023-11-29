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
    
    res.json(sellDetails);  // Devuelve solo los detalles de la venta
  } catch (error) {
    console.error('Error al obtener detalles de venta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getSellAndClientDetails
};