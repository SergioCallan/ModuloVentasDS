const pool= require ('../db')

//Registrar Venta

const addDetails= async(req, res)=>{
    try{
        const {id_venta, id_detalle, id_producto, cantidad, id_garantia, tiempo_garantia, tipo}= req.body
        const query= "INSERT INTO detalleventa (id_venta, id_detalle, id_producto, cantidad, id_garantia, tiempo_garantia, tipo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *"
        const values= [id_venta, id_detalle, id_producto, cantidad, id_garantia, tiempo_garantia, tipo]
        const result= await pool.query(query, values)
        return res.json(result.rows[0])

    } catch(error){
        console.error('Error al guardar el detalle de venta: ', error)
    }
}

const getSellDetails= async(req, res)=>{
    try{
        const idventa= req.params.idventa
        const query= "SELECT * FROM detalleventa WHERE id_venta= $1"
        const results= await pool.query(query, [idventa])
        if(results.rows.length===0){
            res.json(null)
        }
        else{
            res.json(results.rows)
        }
    }catch(error){
        console.log('Error al recuperar los detalles de venta: ', error)
    }
}

const getSelldni= async(req, res)=>{
    try{
        const dni_cliente= req.params.dni_cliente
        const query= "SELECT * FROM venta WHERE dni_cliente= $1"
        const results= await pool.query(query, [dni_cliente])
        if(results.rows.length===0){
            res.json(null)
        }
        else{
            res.json(results.rows)
        }
    }catch(error){
        console.log('Error al recuperar las ventas: ', error)
    }
}

const getSellid= async(req, res)=>{
    try{
        const id_venta= req.params.id_venta
        const query= "SELECT * FROM venta WHERE id_venta= $1"
        const results= await pool.query(query, [id_venta])
        if(results.rows.length===0){
            res.json(null)
        }
        else{
            res.json(results.rows[0])
        }
    }catch(error){
        console.log('Error al recuperar las ventas: ', error)
    }
}

const deleteSell= async(req, res)=>{
    try{
        const idventa= req.params.idventa
        const query= "DELETE FROM detalleventa WHERE id_venta=$1"
        const result= await pool.query(query, [idventa])
        res.send("Venta eliminada")
    }catch(error){
        console.log('Error al eliminar los datos: ', error)
    }
}

const registerSell= async(req, res)=>{
    try{
        const {id_venta, dni_cliente, fecha}= req.body
        const query= "INSERT INTO venta (id_venta, dni_cliente, fecha) VALUES($1, $2, $3) RETURNING *"
        const values= [id_venta, dni_cliente, fecha]
        const result= await pool.query(query, values)
        return res.json(result.rows[0])
    }catch(error){
        console.error('Error al guardar la venta: ', error)
    }
}

const deleteDetail= async(req, res)=>{
    try{
        const iddetalle= req.params.id_detalle
        console.log(iddetalle)
        const query= "DELETE FROM detalleventa WHERE id_detalle=$1"
        const result= await pool.query(query, [iddetalle])
        res.send("Detalle de venta eliminado")
    }catch(error){
        console.error("Error al eliminar el detalle de venta: ", error)
    }
}

const calculateCost = async (req, res) => {
    try {
        const id_venta = req.params.id_venta;

        // Consulta para obtener los id_producto y cantidad de la tabla detalleventa
        const detalleventaQuery = 'SELECT id_producto, cantidad FROM detalleventa WHERE id_venta = $1';
        const detalleventaResult = await pool.query(detalleventaQuery, [id_venta]);

        // Crear una cadena de marcadores de posición ($1, $2, $3, ...) según la cantidad de registros
        const placeholders = detalleventaResult.rows.map((row, index) => `$${index + 1}`).join(',');
        const idProductoQuery = `SELECT SUM(precio * cantidad) as total FROM celular WHERE id_celular IN (${placeholders})`;

        // Crear un array con los valores de id_producto
        const idProductos = detalleventaResult.rows.map(row => row.id_producto);

        const costeResult = await pool.query(idProductoQuery, idProductos);

        // Obtener el resultado total de la suma de precios multiplicados por cantidad
        const totalCost = costeResult.rows[0].total;

        return res.json({ totalCost });
    } catch (error) {
        console.error('Error al calcular los costes: ', error);
        return res.status(500).json({ error: 'Error al calcular los costes' });
    }
};



module.exports={
    addDetails,
    getSellDetails,
    deleteSell,
    registerSell,
    deleteDetail,
    getSelldni,
    getSellid,
    calculateCost
}