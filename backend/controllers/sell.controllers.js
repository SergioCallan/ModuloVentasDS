const pool= require ('../db')

//Registrar Venta

const addDetails= async(req, res)=>{
    try{
        const {id_venta, id_detalle, id_producto, cantidad, id_garantia, tiempo_garantia, tipo, coste_total}= req.body
        const query= "INSERT INTO detalleventa (id_venta, id_detalle, id_producto, cantidad, id_garantia, tiempo_garantia, tipo, coste_total) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *"
        const values= [id_venta, id_detalle, id_producto, cantidad, id_garantia, tiempo_garantia, tipo, coste_total]
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
        const {id_venta, dni_cliente, fecha, monto}= req.body
        const query= "INSERT INTO venta (id_venta, dni_cliente, fecha, monto) VALUES($1, $2, $3, $4) RETURNING *"
        const values= [id_venta, dni_cliente, fecha, monto]
        const result= await pool.query(query, values)
        return res.json(result.rows[0])
    }catch(error){
        console.error('Error al guardar la venta: ', error)
    }
}

const deleteDetail= async(req, res)=>{
    try{
        const iddetalle= req.params.id_detalle
        const query= "DELETE FROM detalleventa WHERE id_detalle=$1"
        const result= await pool.query(query, [iddetalle])
        res.send("Detalle de venta eliminado")
    }catch(error){
        console.error("Error al eliminar el detalle de venta: ", error)
    }
}

const calculateSell= async(req, res)=>{
    try{
        const id_venta= req.params.id_venta
        const query= "SELECT SUM(coste_total) AS monto FROM detalleventa WHERE id_venta = $1"
        const result= await pool.query(query, [id_venta])
        res.send(result.rows[0])
    } catch(error){
        console.error("Error al calcular el monto total: ", error)
    }
}


module.exports={
    addDetails,
    getSellDetails,
    deleteSell,
    registerSell,
    deleteDetail,
    getSelldni,
    getSellid,
    calculateSell
}