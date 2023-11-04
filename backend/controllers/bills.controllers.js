const pool= require ('../db')

const searchbilldni= async(req, res)=>{
    try{
        const dni_cliente= req.params.dni_cliente
        console.log(dni_cliente)
        const query= "SELECT * FROM facturas WHERE dni_cliente= $1";
        const result= await pool.query(query, [dni_cliente])
        if(result.rows.length===0){
            res.json(null)
        }
        else{
            res.json(result.rows)
        }
    }catch(error){
        console.error("Error al obtener las facturas: ", error)
    }
}

const searchbillnumber= async(req, res)=>{
    try{
        const numero_linea= req.params.numero_linea
        const query= "SELECT * FROM facturas WHERE numero_linea= $1";
        const result= await pool.query(query, [numero_linea])
        if(result.rows.length===0){
            res.json(null)
        }
        else{
            res.json(result.rows)
        }
    }catch(error){
        console.error("Error al obtener las facturas: ", error)
    }
}

const searchbillid= async(req, res)=>{
    try{
        const id_factura= req.params.id_factura
        const query= "SELECT * FROM facturas WHERE id_factura= $1";
        const result= await pool.query(query, [id_factura])
        if(result.rows.length===0){
            res.json(null)
        }
        else{
            res.json(result.rows)
        }
    }catch(error){
        console.error("Error al obtener las facturas: ", error)
    }
}


module.exports={
    searchbilldni,
    searchbillnumber,
    searchbillid,
}