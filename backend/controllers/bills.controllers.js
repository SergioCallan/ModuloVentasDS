const pool= require ('../db')
const uuid= require('uuidv4')
const moment = require('moment');


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

const updateBill= async(req, res)=>{
    try{
        const numero_linea= req.params.numero_linea
        const query= "SELECT * FROM facturas WHERE numero_linea= $1 ORDER BY fecha_pago DESC LIMIT 1";
        const result= await pool.query(query, [numero_linea])
        if(result.rows.length===0){
            res.json(null)
        }
        else{
            const factura= result.rows[0]
            factura.id_factura= uuid();
            factura.fecha_pago = moment(factura.fecha_pago).add(1, 'months').format('YYYY-MM-DD');
            const query2= "INSERT INTO facturas (id_factura, dni_cliente, numero_linea, precio, fecha_pago, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"
            const values = [
                factura.id_factura,
                factura.dni_cliente,
                factura.numero_linea,
                factura.precio,
                factura.fecha_pago,
                factura.estado
            ];
            const result2 = await pool.query(query2, values);
            return res.json(result2.rows[0]);
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
            res.json(result.rows[0])
        }
    }catch(error){
        console.error("Error al obtener las facturas: ", error)
    }
}

const createbill= async(req, res)=>{
    try{
        const {id_factura, dni_cliente, numero_linea, precio, fecha_pago, estado}= req.body
        const query= "INSERT INTO facturas(id_factura, dni_cliente, numero_linea, precio, fecha_pago, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"
        const values= [id_factura, dni_cliente, numero_linea, precio, fecha_pago, estado]
        const result= await pool.query(query, values)
        return res.json(result.rows[0])
    } catch(error){
        console.error("Error al guardar la factura: ", error)
    }
}

const searchpaybillnumero= async(req, res)=>{
    try{
        const numero_linea= req.params.numero_linea
        const query= "SELECT * FROM facturas WHERE numero_linea= $1, estado='Pagado'";
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

const searchpaybilldni= async(req, res)=>{
    try{
        const dni_cliente= req.params.dni_cliente
        const query= "SELECT * FROM facturas WHERE dni_cliente= $1 AND estado='Pagado'";
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

module.exports={
    searchbilldni,
    searchbillnumber,
    searchbillid,
    createbill,
    searchpaybilldni,
    searchpaybillnumero,
    updateBill
}