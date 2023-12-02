const pool = require('../db');

const getSellById = async (req, res) => {
  try {
    const idVenta = req.params.idVenta; // Recibe el ID de venta como parámetro
    const query = 'SELECT * FROM venta WHERE id_venta = $1';
    const result = await pool.query(query, [idVenta]);
    if (result.rows.length === 0) {
      res.json(null);
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error al buscar venta por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getLastSell = async (req, res) => {
    try {
      const query = 'SELECT * FROM venta ORDER BY id_venta DESC LIMIT 1';
      const result = await pool.query(query);
      if (result.rows.length === 0) {
        res.json(null);
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      console.error('Error al buscar la última venta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  const getSellDetailsById = async (req, res) => {
    const idDetalle = req.params.id_detalle;
    try {
      const query = 'SELECT * FROM detalleventa WHERE id_detalle = $1'; // Asume que tienes una tabla llamada 'detalles_venta'
      const result = await pool.query(query, [idDetalle]);
      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Detalle no encontrado' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      console.error('Error al buscar detalles por ID:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
 


module.exports = {
  getSellDetailsById,
  getSellById,
  getLastSell,

};
