const pool= require ('../db')
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

/*
const createReport= async(req, res)=>{
    const {tipo, tiempo, periodo1, periodo2}= req.body
    const Filtro= new FiltroState()
    Filtro.actualizarDatos(tipo, tiempo, periodo1, periodo2)
    const dataTipo= Filtro.buscarDatos(tiempo, periodo1, periodo2)
}

module.exports={
    createReport
}

*/

const createGReportDaily= async(req,res)=>{
    try{
        const {periodo1, periodo2}= req.body
        console.log(periodo1, periodo2)
        const query= "SELECT SUM(monto) AS total, fecha FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY fecha ORDER BY fecha"
        const resultVentas= await pool.query(query, [periodo1, periodo2])
        console.log(resultVentas.rows)
        return res.json(resultVentas.rows)
    }catch(error){
        console.error("Error al buscar datos: ", error)
    }
}

const createEReportDaily = async (req, res) => {
    try {
        const { periodo1, periodo2 } = req.body;
        const queryVentas = "SELECT id_venta, fecha FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY id_venta, fecha ORDER BY fecha";
        const resultVentas = await pool.query(queryVentas, [periodo1, periodo2]);

        const detallePromises = resultVentas.rows.map(async (venta) => {
            const queryDetalles = "SELECT id_venta, SUM(coste_total) AS total FROM detalleventa WHERE tipo='Celular' AND id_venta= $1 GROUP BY id_venta HAVING SUM(coste_total) > 0";
            const resultDetalles = await pool.query(queryDetalles, [venta.id_venta]);
            return resultDetalles.rows[0] || { id_venta: venta.id_venta, total: 0 };
        });

        const detallesTotales = await Promise.all(detallePromises);

        const result = detallesTotales.map((detalle) => ({
            id_venta: detalle.id_venta,
            fecha: resultVentas.rows.find((venta) => venta.id_venta === detalle.id_venta).fecha,
            total: detalle.total,
        }));

        return res.json(result);
    } catch (error) {
        console.error("Error al buscar datos: ", error);
        throw error;
    }
};

const createPReportDaily= async(req, res)=>{
    try {
        const {periodo1, periodo2}= req.body
        const queryVentas = "SELECT id_venta, fecha FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY id_venta, fecha ORDER BY fecha";
        const resultVentas = await pool.query(queryVentas, [periodo1, periodo2]);

        const detallePromises = resultVentas.rows.map(async (venta) => {
            const queryDetalles = "SELECT id_venta, SUM(coste_total) AS total FROM detalleventa WHERE tipo='Plan' AND id_venta= $1 GROUP BY id_venta";
            const resultDetalles = await pool.query(queryDetalles, [venta.id_venta]);
            return resultDetalles.rows[0] || { id_venta: venta.id_venta, total: 0 };
        });

        const detallesTotales = await Promise.all(detallePromises);

        const detallesFiltrados = detallesTotales.filter((detalle) => detalle.total !== 0);

        const result = detallesFiltrados.map((detalle) => ({
            id_venta: detalle.id_venta,
            fecha: resultVentas.rows.find((venta) => venta.id_venta === detalle.id_venta).fecha,
            total: detalle.total,
        }));

        return res.json(result);
    } catch (error) {
        console.error("Error al buscar datos: ", error);
        throw error;
    }
}

module.exports={
    createGReportDaily,
    createEReportDaily,
    createPReportDaily
}