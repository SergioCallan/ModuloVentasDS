const pool= require ('../db')

const createGReportDaily= async(req,res)=>{
    try{
        const {periodo1, periodo2}= req.query
        const query= "SELECT SUM(monto) AS total, fecha as start_date, fecha as end_date FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY fecha ORDER BY fecha"
        const resultVentas= await pool.query(query, [periodo1, periodo2])
        console.log(resultVentas.rows)
        return res.json(resultVentas.rows)
    }catch(error){
        console.error("Error al buscar datos: ", error)
    }
}

const createGReportWeekly= async(req,res)=>{
    try{
        const {periodo1, periodo2}= req.query
        const query= "SELECT DATE_TRUNC('week', fecha) AS semana, MIN(fecha) AS start_date, MAX(fecha) AS end_date, SUM(monto) AS total FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY semana ORDER BY semana"
        const resultVentas= await pool.query(query, [periodo1, periodo2])
        console.log(resultVentas.rows)
        return res.json(resultVentas.rows)
    }catch(error){
        console.error("Error al buscar datos: ", error)
    }
}

const createGReportMonthly= async(req,res)=>{
    try{
        const {periodo1, periodo2}= req.query
        const query= "SELECT DATE_TRUNC('month', fecha) AS mes, MIN(fecha) AS start_date, MAX(fecha) AS end_date, SUM(monto) AS total FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY mes ORDER BY mes"
        const resultVentas= await pool.query(query, [periodo1, periodo2])
        console.log(resultVentas.rows)
        return res.json(resultVentas.rows)
    }catch(error){
        console.error("Error al buscar datos: ", error)
    }
}

const createEReportDaily = async (req, res) => {
    try {
        const { periodo1, periodo2 } = req.query
        const queryVentas = "SELECT id_venta, fecha AS start_date, fecha AS end_date FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY id_venta, fecha ORDER BY fecha";
        const resultVentas = await pool.query(queryVentas, [periodo1, periodo2]);

        const detallePromises = resultVentas.rows.map(async (venta) => {
            const queryDetalles = "SELECT id_venta, SUM(coste_total) AS total FROM detalleventa WHERE tipo='Celular' AND id_venta= $1 GROUP BY id_venta";
            const resultDetalles = await pool.query(queryDetalles, [venta.id_venta]);
            return resultDetalles.rows[0] || { id_venta: venta.id_venta, total: 0 };
        });

        const detallesTotales = await Promise.all(detallePromises);

        // Filtrar los detalles que tienen total diferente de 0
        const detallesFiltrados = detallesTotales.filter((detallesTotales) => detallesTotales.total > 0);

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
};

const createEReportWeekly = async (req, res) => {
    try {
        const { periodo1, periodo2 } = req.query;

        const queryVentas = `SELECT id_venta, MIN(fecha) as start_date, MAX(fecha) as end_date FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY id_venta, EXTRACT(WEEK FROM fecha) ORDER BY start_date`;

        const resultVentas = await pool.query(queryVentas, [periodo1, periodo2]);

        const detallePromises = resultVentas.rows.map(async (venta) => {
            const queryDetalles = `SELECT id_venta, SUM(coste_total) AS total FROM detalleventa WHERE tipo='Celular' AND id_venta= $1 GROUP BY id_venta`;
            console.log(resultVentas)
            const resultDetalles = await pool.query(queryDetalles, [venta.id_venta]);
            return resultDetalles.rows[0] || { id_venta: venta.id_venta, total: 0 };
        });

        const detallesTotales = await Promise.all(detallePromises);

        // Filtrar los detalles que tienen total diferente de 0
        const detallesFiltrados = detallesTotales.filter((detalle) => detalle.total > 0);

        const result = detallesFiltrados.map((detalle) => ({
            id_venta: detalle.id_venta,
            start_date: resultVentas.rows.find((venta) => venta.id_venta === detalle.id_venta).start_date,
            end_date: resultVentas.rows.find((venta) => venta.id_venta === detalle.id_venta).end_date,
            total: detalle.total,
        }));
        console.log(result)
        return res.json(result);
    } catch (error) {
        console.error("Error al buscar datos: ", error);
        throw error;
    }
};

const createEReportMonthly = async (req, res) => {
    try {
        const { periodo1, periodo2 } = req.query;

        const queryVentas = `SELECT id_venta, MIN(fecha) as start_date, MAX(fecha) as end_date FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY id_venta, EXTRACT(MONTH FROM fecha) ORDER BY start_date`;

        const resultVentas = await pool.query(queryVentas, [periodo1, periodo2]);

        const detallePromises = resultVentas.rows.map(async (venta) => {
            const queryDetalles = `SELECT id_venta, SUM(coste_total) AS total FROM detalleventa WHERE tipo='Celular' AND id_venta= $1 GROUP BY id_venta`;
            console.log(resultVentas)
            const resultDetalles = await pool.query(queryDetalles, [venta.id_venta]);
            return resultDetalles.rows[0] || { id_venta: venta.id_venta, total: 0 };
        });

        const detallesTotales = await Promise.all(detallePromises);

        // Filtrar los detalles que tienen total diferente de 0
        const detallesFiltrados = detallesTotales.filter((detalle) => detalle.total > 0);

        const result = detallesFiltrados.map((detalle) => ({
            id_venta: detalle.id_venta,
            start_date: resultVentas.rows.find((venta) => venta.id_venta === detalle.id_venta).start_date,
            end_date: resultVentas.rows.find((venta) => venta.id_venta === detalle.id_venta).end_date,
            total: detalle.total,
        }));
        console.log(result)
        return res.json(result);
    } catch (error) {
        console.error("Error al buscar datos: ", error);
        throw error;
    }
};


const createPReportDaily= async(req, res)=>{
    try {
        const {periodo1, periodo2}= req.query
        const queryVentas = "SELECT id_venta, fecha AS start_date, fecha AS end_date FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY id_venta, fecha ORDER BY fecha";
        const resultVentas = await pool.query(queryVentas, [periodo1, periodo2]);

        const detallePromises = resultVentas.rows.map(async (venta) => {
            const queryDetalles = "SELECT id_venta, SUM(coste_total) AS total FROM detalleventa WHERE tipo='Plan' AND id_venta= $1 GROUP BY id_venta";
            const resultDetalles = await pool.query(queryDetalles, [venta.id_venta]);
            return resultDetalles.rows[0] || { id_venta: venta.id_venta, total: 0 };
        });

        const detallesTotales = await Promise.all(detallePromises);

        // Filtrar los detalles que tienen total diferente de 0
        const detallesFiltrados = detallesTotales.filter((detallesTotales) => detallesTotales.total > 0);

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

const createPReportWeekly = async (req, res) => {
    try {
        const { periodo1, periodo2 } = req.query

        const queryVentas = `SELECT id_venta, MIN(fecha) as start_date, MAX(fecha) as end_date FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY id_venta, EXTRACT(WEEK FROM fecha) ORDER BY start_date`;

        const resultVentas = await pool.query(queryVentas, [periodo1, periodo2]);

        const detallePromises = resultVentas.rows.map(async (venta) => {
            const queryDetalles = `SELECT id_venta, SUM(coste_total) AS total FROM detalleventa WHERE tipo='Plan' AND id_venta= $1 GROUP BY id_venta`;
            console.log(resultVentas)
            const resultDetalles = await pool.query(queryDetalles, [venta.id_venta]);
            return resultDetalles.rows[0] || { id_venta: venta.id_venta, total: 0 };
        });

        const detallesTotales = await Promise.all(detallePromises);

        // Filtrar los detalles que tienen total diferente de 0
        const detallesFiltrados = detallesTotales.filter((detalle) => detalle.total > 0);

        const result = detallesFiltrados.map((detalle) => ({
            id_venta: detalle.id_venta,
            start_date: resultVentas.rows.find((venta) => venta.id_venta === detalle.id_venta).start_date,
            end_date: resultVentas.rows.find((venta) => venta.id_venta === detalle.id_venta).end_date,
            total: detalle.total,
        }));
        console.log(result)
        return res.json(result);
    } catch (error) {
        console.error("Error al buscar datos: ", error);
        throw error;
    }
};

const createPReportMonthly = async (req, res) => {
    try {
        const { periodo1, periodo2 } = req.query

        const queryVentas = `SELECT id_venta, MIN(fecha) as start_date, MAX(fecha) as end_date FROM venta WHERE fecha BETWEEN $1 AND $2 GROUP BY id_venta, EXTRACT(MONTH FROM fecha) ORDER BY start_date`;

        const resultVentas = await pool.query(queryVentas, [periodo1, periodo2]);

        const detallePromises = resultVentas.rows.map(async (venta) => {
            const queryDetalles = `SELECT id_venta, SUM(coste_total) AS total FROM detalleventa WHERE tipo='Plan' AND id_venta= $1 GROUP BY id_venta`;
            console.log(resultVentas)
            const resultDetalles = await pool.query(queryDetalles, [venta.id_venta]);
            return resultDetalles.rows[0] || { id_venta: venta.id_venta, total: 0 };
        });

        const detallesTotales = await Promise.all(detallePromises);

        // Filtrar los detalles que tienen total diferente de 0
        const detallesFiltrados = detallesTotales.filter((detalle) => detalle.total > 0);

        const result = detallesFiltrados.map((detalle) => ({
            id_venta: detalle.id_venta,
            start_date: resultVentas.rows.find((venta) => venta.id_venta === detalle.id_venta).start_date,
            end_date: resultVentas.rows.find((venta) => venta.id_venta === detalle.id_venta).end_date,
            total: detalle.total,
        }));
        console.log(result)
        return res.json(result);
    } catch (error) {
        console.error("Error al buscar datos: ", error);
        throw error;
    }
};


module.exports={
    createGReportDaily,
    createGReportWeekly,
    createGReportMonthly,
    createEReportDaily,
    createEReportWeekly,
    createEReportMonthly,
    createPReportDaily,
    createPReportWeekly,
    createPReportMonthly
}