const pool= require ('../db')

const getSellAndClientDetails = async (req, res) => {
  try {
    const { id_detalle } = req.params;
    const sellDetailsQuery = `
      SELECT dv.*, v.dni_cliente 
      FROM detalleventa dv 
      INNER JOIN venta v ON dv.id_venta = v.id_venta 
      WHERE dv.id_detalle = $1`;
    const sellDetailsResult = await pool.query(sellDetailsQuery, [id_detalle]);

    if (sellDetailsResult.rows.length === 0) {
      return res.status(404).json({ message: 'Detalle de venta no encontrado.' });
    }

    const sellDetails = sellDetailsResult.rows[0];
    const dniCliente = sellDetails.dni_cliente;

    if (!dniCliente) {
      return res.status(404).json({ message: 'DNI del cliente no encontrado.' });
    }

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

    const responseData = {
      ...sellDetails,
      cliente: cliente
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error al obtener detalles de venta y cliente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
module.exports={
  getSellAndClientDetails
}