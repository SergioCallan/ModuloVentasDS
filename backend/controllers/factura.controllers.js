const pool= require('../db')

const associate= async (req, res)=>{
    try{
        const {numero, plan, fecha_compra, fecha_pago, monto_pago, dni_cliente, estado}= req.body
        const query= 'INSERT INTO linea_telefono(numero, plan, fecha_compra, fecha_pago, monto_pago, dni_cliente, estado) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
        const values= [numero, plan, fecha_compra, fecha_pago, monto_pago, dni_cliente, estado]
        const result= await pool.query(query, values)
        return res.json(result.rows[0])
    }catch(error){
        console.error("Error al guardar en la linea: ", error)
    }
}

const getLineas= async (req, res)=>{
    try{
        const dni_cliente=req.params.dni_cliente
        const query= "SELECT * FROM linea_telefono WHERE dni_cliente= $1"
        const results= await pool.query(query, [dni_cliente])
        if(results.rows.length===0){
            res.json(null)
        }
        else{
            res.json(results.rows)
        }
    }catch(error){
        console.error("Error al obtener las lineas: ", error)
    }
}

const pagoLinea = async (req, res) => {
    try {
        const numero = req.params.numero;
        const query = 'UPDATE linea_telefono SET fecha_pago = fecha_pago + interval \'1 month\', estado=0 WHERE numero = $1';
        await pool.query(query, [numero]);
        res.status(200).json({ message: 'Fecha de pago actualizada con éxito' });
    } catch (error) {
        console.error("Error al registrar una nueva fecha: ", error);
        res.status(500).json({ error: 'Hubo un error al actualizar la fecha de pago' });
    }
};

const atrasoLinea= async (req, res)=>{
    try{
        const numero= req.params.numero;
        const query= 'UPDATE linea_telefono SET estado= 1 WHERE numero= $1'
        const results= await pool.query(query, [numero])
        res.status(200).json({ message: 'Estado actualizado con éxito' });
    } catch(error){
        console.error("Error al confirmar el atraso: ", error);
        res.status(500).json({ error: 'Hubo un error al actualizar el estado' });
    }
}

const cancelarLinea= async (req, res)=>{
    try{
        const numero= req.params.numero;
        const query= 'UPDATE linea_telefono SET estado= 2 WHERE numero= $1'
        const results= await pool.query(query, [numero])
        res.status(200).json({ message: 'Estado actualizado con éxito' });
    } catch(error){
        console.error("Error al confirmar la cancelacion: ", error);
        res.status(500).json({ error: 'Hubo un error al actualizar el estado' });
    }
}

module.exports={
    associate,
    getLineas,
    pagoLinea, 
    atrasoLinea,
    cancelarLinea
}