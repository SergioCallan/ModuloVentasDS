const pool = require('../db');

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
      const query = 'SELECT * FROM detalles_venta WHERE id_detalle = $1'; // Asume que tienes una tabla llamada 'detalles_venta'
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
 
  const getSaleAndClientDetails = async (req, res) => {
    const idDetalle = req.params.id_detalle;
    try {
      const query = `
        SELECT cl.nombre, cl.apellido, cl.correo, cl.sexo
        FROM detalleventa dv
        INNER JOIN venta v ON dv.id_venta = v.id_venta
        INNER JOIN clientes cl ON v.dni_cliente = cl.dni_cliente
        WHERE dv.id_detalle = $1;
      `;
      const result = await pool.query(query, [idDetalle]);
      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Detalles de la venta no encontrados' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      console.error('Error al buscar detalles de venta y cliente:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
  getSellDetailsById,
  getLastSell,
  getSaleAndClientDetails
};
