const pool= require ('../db')

//Registrar Venta

const addDetails= async(req, res)=>{
    try{
        const {id_venta, id_detalle, id_producto, cantidad, id_garantia}= req.body
        const query= "INSERT INTO detalleventa (id_venta, id_detalle, id_producto, cantidad, id_garantia) VALUES ($1, $2, $3, $4, $5) RETURNING *"
        const values= [id_venta, id_detalle, id_producto, cantidad, id_garantia]
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

const deleteSell= async(req, res)=>{
    try{
        const idventa= req.params.idventa
        const query= "DELETE FROM detalleventa WHERE id_venta=$1"
        const result= await pool.query(query, [idventa])
        res.send("Vuelo eliminado")
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

module.exports={
    addDetails,
    getSellDetails,
    deleteSell,
    registerSell
}